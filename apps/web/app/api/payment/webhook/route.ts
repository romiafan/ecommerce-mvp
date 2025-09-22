import { NextRequest, NextResponse } from 'next/server';

import { ConvexHttpClient } from 'convex/browser';

import { api } from '@/convex/_generated/api';
import { verifyWebhookSignature } from '@/lib/midtrans';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const notification = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = notification;

    // Verify webhook signature
    const isValidSignature = verifyWebhookSignature(
      order_id,
      status_code,
      gross_amount,
      process.env.MIDTRANS_SERVER_KEY!,
      signature_key
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 401 }
      );
    }

    let orderStatus:
      | 'pending'
      | 'confirmed'
      | 'processing'
      | 'shipped'
      | 'delivered'
      | 'cancelled'
      | 'refunded' = 'pending';

    // Map Midtrans status to our status
    if (transaction_status === 'capture') {
      if (fraud_status === 'challenge') {
        // Keep as pending for manual review
      } else if (fraud_status === 'accept') {
        orderStatus = 'confirmed';
      }
    } else if (transaction_status === 'settlement') {
      orderStatus = 'confirmed';
    } else if (
      transaction_status === 'cancel' ||
      transaction_status === 'deny' ||
      transaction_status === 'expire'
    ) {
      orderStatus = 'cancelled';
    } else if (transaction_status === 'pending') {
      orderStatus = 'pending';
    }

    // Find the order by order number
    const order = await convex.query(api.orders.getOrderByNumber, {
      orderNumber: order_id,
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    // Update order in database
    await convex.mutation(api.orders.updateOrderStatus, {
      orderId: order._id,
      status: orderStatus,
      notes: `Payment ${transaction_status}. Fraud status: ${fraud_status || 'N/A'}`,
    });

    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
