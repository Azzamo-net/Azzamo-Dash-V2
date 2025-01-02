import { env } from '../config/env';

export const processPayment = async (invoice: string): Promise<boolean> => {
  if (!env.demoMode) {
    // In production, this would integrate with real lightning payment verification
    return false;
  }

  // Simulate payment processing in demo mode
  await new Promise(resolve => setTimeout(resolve, 1500));
  return true;
};