import { CoreApi, Snap } from 'midtrans-client';

// Initialize Midtrans
const snap = new Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

const coreApi = new CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export interface PaymentItem {
  id: string;
  price: number;
  quantity: number;
  name: string;
  category?: string;
}

export interface CustomerDetails {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  billing_address?: {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    country_code: string;
  };
  shipping_address?: {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    country_code: string;
  };
}

export interface PaymentOptions {
  enabled_payments?: string[];
  credit_card?: {
    secure: boolean;
    channel: string;
    bank: string;
    installment?: {
      required: boolean;
      terms: {
        [bank: string]: number[];
      };
    };
  };
  bca_va?: {
    va_number: string;
  };
  bni_va?: {
    va_number: string;
  };
  bri_va?: {
    va_number: string;
  };
  permata_va?: {
    va_number: string;
    recipient_name: string;
  };
  gopay?: {
    enable_callback: boolean;
    callback_url: string;
  };
  shopeepay?: {
    callback_url: string;
  };
}

// Create payment transaction
export async function createPayment(
  orderId: string,
  grossAmount: number,
  items: PaymentItem[],
  customerDetails: CustomerDetails,
  options?: PaymentOptions
) {
  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    item_details: items,
    customer_details: customerDetails,
    enabled_payments: options?.enabled_payments || [
      'credit_card',
      'bca_va',
      'bni_va',
      'bri_va',
      'permata_va',
      'gopay',
      'shopeepay',
      'dana',
      'ovo',
      'linkaja',
      'indomaret',
      'alfamart',
    ],
    credit_card: options?.credit_card || {
      secure: true,
      channel: 'migs',
      bank: 'bca',
    },
    bca_va: options?.bca_va,
    bni_va: options?.bni_va,
    bri_va: options?.bri_va,
    permata_va: options?.permata_va,
    gopay: options?.gopay,
    shopeepay: options?.shopeepay,
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      error: `${process.env.NEXT_PUBLIC_APP_URL}/payment/error`,
      pending: `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending`,
    },
    expiry: {
      start_time: new Date().toISOString().replace(/\.\d{3}Z$/, '+07:00'),
      unit: 'minutes',
      duration: 30,
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return {
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    };
  } catch (error) {
    console.error('Midtrans payment creation error:', error);
    throw new Error('Failed to create payment');
  }
}

// Check payment status
export async function checkPaymentStatus(orderId: string) {
  try {
    const statusResponse = await coreApi.status(orderId);
    return statusResponse;
  } catch (error) {
    console.error('Midtrans status check error:', error);
    throw new Error('Failed to check payment status');
  }
}

// Cancel payment
export async function cancelPayment(orderId: string) {
  try {
    const cancelResponse = await coreApi.cancel(orderId);
    return cancelResponse;
  } catch (error) {
    console.error('Midtrans cancellation error:', error);
    throw new Error('Failed to cancel payment');
  }
}

// Approve payment (for credit card)
export async function approvePayment(orderId: string) {
  try {
    const approveResponse = await coreApi.approve(orderId);
    return approveResponse;
  } catch (error) {
    console.error('Midtrans approval error:', error);
    throw new Error('Failed to approve payment');
  }
}

// Refund payment
export async function refundPayment(
  orderId: string,
  amount?: number,
  reason?: string
) {
  try {
    const refundResponse = await coreApi.refund(orderId, {
      amount,
      reason,
    });
    return refundResponse;
  } catch (error) {
    console.error('Midtrans refund error:', error);
    throw new Error('Failed to refund payment');
  }
}

// Verify webhook notification
export function verifyWebhookSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string,
  signatureKey: string
): boolean {
  const crypto = require('crypto');
  const hash = crypto
    .createHash('sha512')
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest('hex');

  return hash === signatureKey;
}

// Client-side payment utilities
export const clientPayment = {
  // Initialize Midtrans Snap on client side
  initSnap() {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src =
          process.env.MIDTRANS_IS_PRODUCTION === 'true'
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.stg.midtrans.com/snap/snap.js';
        script.setAttribute(
          'data-client-key',
          process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
        );
        script.onload = () => resolve((window as any).snap);
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  },

  // Pay with Snap
  async payWithSnap(
    token: string,
    onSuccess?: (result: any) => void,
    onPending?: (result: any) => void,
    onError?: (result: any) => void
  ) {
    const snap = await this.initSnap();

    (snap as any).pay(token, {
      onSuccess: (result: any) => {
        console.log('Payment success:', result);
        onSuccess?.(result);
      },
      onPending: (result: any) => {
        console.log('Payment pending:', result);
        onPending?.(result);
      },
      onError: (result: any) => {
        console.error('Payment error:', result);
        onError?.(result);
      },
      onClose: () => {
        console.log('Payment popup closed');
      },
    });
  },
};
