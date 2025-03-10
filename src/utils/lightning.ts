import { env } from '../config/env';
import { createInvoice } from '../services/lnbits';
import { useAuthStore } from '../store/useAuthStore';
import { formatTimeBreakdown } from './timeFormat';
import { calculatePrice } from './pricing';

export const generateInvoice = async (minutes: number) => {
  const user = useAuthStore.getState().user;
  if (!user) throw new Error('User not authenticated');

  const days = Math.floor(minutes / (24 * 60));
  const { finalPrice } = calculatePrice(days);
  
  try {
    const response = await createInvoice({
      amount: finalPrice,
      memo: `Azzamo Premium time (${formatTimeBreakdown(days)})`,
      webhook: env.lnbits.webhook,
      extra: {
        pubkey: user.pubkey,
        time_added: minutes,
        days,
        amount_sats: finalPrice
      }
    });

    return {
      payment_request: response.payment_request,
      payment_hash: response.payment_hash,
      expiry: response.expiry,
    };
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};

// Export the checkPaymentStatus function
export const checkPaymentStatus = async (paymentHash: string) => {
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
