import { NextRequest, NextResponse } from 'next/server';

import { ConvexHttpClient } from 'convex/browser';

import { api } from '@/convex/_generated/api';
import { getCurrentUser } from '@/lib/auth-server';
import {
  type CustomerDetails,
  type PaymentItem,
  createPayment,
} from '@/lib/midtrans';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    const {
      orderId,
      items,
      customerDetails,
      shippingCost = 0,
    } = await request.json();

    // Validate input
    if (!orderId || !items || !customerDetails) {
      return NextResponse.json(
        { message: 'Order ID, items, and customer details are required' },
        { status: 400 }
      );
    }

    // Calculate total amount
    const itemsTotal = items.reduce(
      (total: number, item: PaymentItem) => total + item.price * item.quantity,
      0
    );
    const grossAmount = itemsTotal + shippingCost;

    // Create payment with Midtrans
    const payment = await createPayment(
      orderId,
      grossAmount,
      [
        ...items,
        ...(shippingCost > 0
          ? [
              {
                id: 'shipping',
                name: 'Ongkos Kirim',
                price: shippingCost,
                quantity: 1,
              },
            ]
          : []),
      ],
      customerDetails as CustomerDetails
    );

    // Save order to database
    await convex.mutation(api.orders.createOrder, {
      userId: user.id,
      orderNumber: orderId,
      items: items.map((item: any) => ({
        productId: item.id,
        productName: item.name,
        productImage: item.image || '',
        quantity: item.quantity,
        price: item.price,
        variant: item.variant,
      })),
      subtotal: itemsTotal,
      tax: 0, // Calculate tax if needed
      shipping: shippingCost,
      total: grossAmount,
      currency: 'IDR',
      shippingAddress: {
        firstName: customerDetails.first_name,
        lastName: customerDetails.last_name,
        address1: customerDetails.address,
        city: customerDetails.city,
        state: customerDetails.city, // Use city as state if not available
        postalCode: customerDetails.postal_code || '',
        country: 'Indonesia',
        phone: customerDetails.phone,
      },
      billingAddress: {
        firstName: customerDetails.first_name,
        lastName: customerDetails.last_name,
        address1: customerDetails.address,
        city: customerDetails.city,
        state: customerDetails.city,
        postalCode: customerDetails.postal_code || '',
        country: 'Indonesia',
        phone: customerDetails.phone,
      },
      paymentMethod: 'midtrans',
      paymentIntentId: payment.token,
    });

    return NextResponse.json({
      success: true,
      paymentToken: payment.token,
      redirectUrl: payment.redirect_url,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
