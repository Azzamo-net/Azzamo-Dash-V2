import { env } from '../config/env';

interface CreateInvoiceParams {
  amount: number;
  memo: string;
  webhook: string;
  extra?: Record<string, any>;
  expiry?: number;
  unit?: string;
  internal?: boolean;
}

interface CreateInvoiceResponse {
  payment_hash: string;
  payment_request: string;
}

interface PaymentStatus {
  paid: boolean;
}

export const createInvoice = async (params: CreateInvoiceParams): Promise<CreateInvoiceResponse> => {
  const response = await fetch(`${env.lnbits.url}/api/v1/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': env.lnbits.apiKey,
    },
    body: JSON.stringify({
      out: false,
      amount: params.amount,
      memo: params.memo,
      webhook: params.webhook,
      expiry: params.expiry || 3600,
      unit: params.unit || 'sat',
      internal: params.internal || false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create invoice: ${error}`);
  }

  return response.json();
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
