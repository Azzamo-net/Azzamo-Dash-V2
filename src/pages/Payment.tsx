import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { generateInvoice } from '../utils/lightning';
import { TimeSlider } from '../components/TimeSlider';
import { PaymentInvoice } from '../components/PaymentInvoice';
import { PriceDisplay } from '../components/PriceDisplay';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { calculatePrice } from '../utils/pricing';
import { usePaymentStatus } from '../hooks/usePaymentStatus';
import { useAuthStore } from '../store/useAuthStore';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const refreshUserInfo = useAuthStore(state => state.refreshUserInfo);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [paymentHash, setPaymentHash] = useState<string | null>(null);
  const [expiryTimestamp, setExpiryTimestamp] = useState<number | null>(null);

  const { finalPrice, basePrice, discount } = calculatePrice(days);
  const { isPaid, isExpired, isChecking, timeRemaining } = usePaymentStatus(paymentHash, expiryTimestamp);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { payment_request, payment_hash, expiry } = await generateInvoice(days * 24 * 60);
      setInvoice(payment_request);
      setPaymentHash(payment_hash);
      setExpiryTimestamp(expiry);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewInvoice = () => {
    setInvoice(null);
    setPaymentHash(null);
    setExpiryTimestamp(null);
    handlePayment();
  };

  const handleOpenWallet = () => {
    if (invoice) {
      window.location.href = `lightning:${invoice}`;
    }
  };

  useEffect(() => {
    if (isPaid) {
      refreshUserInfo();
      setTimeout(() => {
        navigate('/payment/success', { 
          state: { days, satsAmount: finalPrice } 
        });
      }, 2000);
    }
  }, [isPaid, days, finalPrice, navigate, refreshUserInfo]);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="card space-y-8">
          {isPaid ? (
            <PaymentSuccess />
          ) : (
            <div className="flex flex-col items-center text-center">
              {!invoice && (
                <>
                  <div className="p-3 bg-primary-500/20 rounded-full mb-4">
                    <Clock className="w-12 h-12 text-primary-500" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">Premium Access</h1>
                  <div className="w-full max-w-xl px-4">
                    <TimeSlider value={days} onChange={setDays} />
                  </div>
                </>
              )}
              
              <PriceDisplay
                days={days}
                finalPrice={finalPrice}
                basePrice={basePrice}
                discount={discount}
                showTimeBreakdown={!!invoice}
              />

              {invoice ? (
                <PaymentInvoice
                  invoice={invoice}
                  onOpenWallet={handleOpenWallet}
                  loading={isChecking}
                  isExpired={isExpired}
                  timeRemaining={timeRemaining}
                  onNewInvoice={handleNewInvoice}
                />
              ) : (
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn btn-primary w-full mt-6"
                >
                  Generate Invoice
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};