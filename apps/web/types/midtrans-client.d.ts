declare module 'midtrans-client' {
  export interface MidtransConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  export interface PaymentItem {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }

  export interface CustomerDetails {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country_code?: string;
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

  export interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  export interface SnapTransactionData {
    transaction_details: TransactionDetails;
    item_details: PaymentItem[];
    customer_details: CustomerDetails;
    enabled_payments?: string[];
    credit_card?: {
      secure?: boolean;
      channel?: string;
      bank?: string;
      installment?: {
        required: boolean;
        terms: {
          [bank: string]: number[];
        };
      };
    };
    bca_va?: {
      va_number?: string;
    };
    bni_va?: {
      va_number?: string;
    };
    bri_va?: {
      va_number?: string;
    };
    permata_va?: {
      va_number?: string;
      recipient_name?: string;
    };
    gopay?: {
      enable_callback?: boolean;
      callback_url?: string;
    };
    shopeepay?: {
      callback_url?: string;
    };
    callbacks?: {
      finish?: string;
      error?: string;
      pending?: string;
    };
    expiry?: {
      start_time?: string;
      unit?: string;
      duration?: number;
    };
  }

  export interface SnapCreateTransactionResponse {
    token: string;
    redirect_url: string;
  }

  export interface CoreApiChargeResponse {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    merchant_id: string;
    gross_amount: string;
    currency: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
    fraud_status?: string;
  }

  export class Snap {
    constructor(config: MidtransConfig);
    createTransaction(
      data: SnapTransactionData
    ): Promise<SnapCreateTransactionResponse>;
  }

  export class CoreApi {
    constructor(config: MidtransConfig);
    charge(data: any): Promise<CoreApiChargeResponse>;
    capture(data: any): Promise<CoreApiChargeResponse>;
    cancel(orderId: string): Promise<CoreApiChargeResponse>;
    approve(orderId: string): Promise<CoreApiChargeResponse>;
    deny(orderId: string): Promise<CoreApiChargeResponse>;
    status(orderId: string): Promise<CoreApiChargeResponse>;
    statusb2b(orderId: string): Promise<CoreApiChargeResponse>;
    expire(orderId: string): Promise<CoreApiChargeResponse>;
    refund(orderId: string, data?: any): Promise<CoreApiChargeResponse>;
    directRefund(orderId: string, data: any): Promise<CoreApiChargeResponse>;
  }
}
