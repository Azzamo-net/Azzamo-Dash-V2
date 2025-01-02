import { env } from '../config/env';
import { createInvoice } from '../services/lnbits';
import { useAuthStore } from '../store/useAuthStore';
import { formatTimeBreakdown } from './timeFormat';

export const generateInvoice = async (minutes: number) => {
  const user = useAuthStore.getState().user;
  if (!user) throw new Error('User not authenticated');

  const amount = Math.round((minutes / (24 * 60)) * env.pricePerDaySats);
  const days = Math.floor(minutes / (24 * 60));
  
  try {
    const response = await createInvoice({
      amount,
      memo: `Azzamo Premium time (${formatTimeBreakdown(days)})`,
      webhook: env.lnbits.webhook,
      extra: {
        pubkey: user.pubkey,
        time_added: minutes,
        days,
        amount_sats: amount
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