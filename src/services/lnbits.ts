import { env } from '../config/env';

interface CreateInvoiceParams {
  amount: number;
  memo: string;
  webhook: string;
  extra?: Record<string, any>;
  expiry?: number;
  wallet_id?: string;
}

interface CreateInvoiceResponse {
  payment_hash: string;
  payment_request: string;
  checking_id: string;
  expiry: number;
}

interface PaymentStatus {
  paid: boolean;
  preimage?: string;
  details?: {
    checking_id: string;
    pending: boolean;
    amount: number;
    fee: number;
    memo: string;
    time: number;
    bolt11: string;
    preimage: string;
    payment_hash: string;
    extra: Record<string, any>;
    webhook?: string;
    webhook_status?: number;
    expiry?: number;
  };
}

export const createInvoice = async (params: CreateInvoiceParams): Promise<CreateInvoiceResponse> => {
  const requestBody = {
    out: false,
    amount: params.amount,
    unit: "sat",
    memo: params.memo,
    webhook: params.webhook,
    extra: params.extra,
    expiry: params.expiry || 3600, // Default 1 hour expiry
    wallet_id: params.wallet_id || env.lnbits.walletId, // Use wallet_id from params or environment
  };

  console.log('Creating invoice with params:', requestBody); // Log request parameters

  const response = await fetch(`${env.lnbits.url}/api/v1/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': env.lnbits.apiKey,
    },
    body: JSON.stringify(requestBody),
  });

  const responseBody = await response.json(); // Capture the response body
  console.log('Response from createInvoice:', responseBody); // Log the response

  if (!response.ok) {
    throw new Error(`Failed to create invoice: ${responseBody.error || responseBody}`);
  }

  return responseBody;
};

export const checkPaymentStatus = async (paymentHash: string): Promise<PaymentStatus> => {
  const response = await fetch(`${env.lnbits.url}/api/v1/payments/${paymentHash}`, {
    headers: {
      'X-Api-Key': env.lnbits.apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to check payment status: ${error}`);
  }

  return response.json();
};
