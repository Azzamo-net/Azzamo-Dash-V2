import { useState, useEffect, useCallback } from 'react';
import { checkPaymentStatus } from '../services/lnbits';

interface PaymentStatusHook {
  isPaid: boolean;
  isExpired: boolean;
  isChecking: boolean;
  error: Error | null;
  checkStatus: () => Promise<void>;
  timeRemaining: number | null;
}

export const usePaymentStatus = (
  paymentHash: string | null,
  expiryTimestamp: number | null
): PaymentStatusHook => {
  const [isPaid, setIsPaid] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const checkStatus = useCallback(async () => {
    if (!paymentHash) return;
    
    try {
      setIsChecking(true);
      const status = await checkPaymentStatus(paymentHash);
      
      if (status.paid) {
        setIsPaid(true);
        setIsExpired(false);
        return;
      }

      // Check expiry
      if (expiryTimestamp) {
        const now = Math.floor(Date.now() / 1000);
        const remaining = expiryTimestamp - now;
        setTimeRemaining(remaining > 0 ? remaining : 0);
        
        if (remaining <= 0) {
          setIsExpired(true);
          return;
        }
      }
    } catch (err) {
      setError(err as Error);
      console.error('Payment status check failed:', err);
    } finally {
      setIsChecking(false);
    }
  }, [paymentHash, expiryTimestamp]);

  useEffect(() => {
    if (!paymentHash || isPaid || isExpired) return;

    const interval = setInterval(checkStatus, 2000);
    checkStatus(); // Initial check

    return () => clearInterval(interval);
  }, [paymentHash, isPaid, isExpired, checkStatus]);

  return {
    isPaid,
    isExpired,
    isChecking,
    error,
    checkStatus,
    timeRemaining
  };
};