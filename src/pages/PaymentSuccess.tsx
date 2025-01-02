import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Zap } from 'lucide-react';
import { formatTimeBreakdown } from '../utils/timeFormat';

interface LocationState {
  days: number;
  satsAmount: number;
}

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { days = 30, satsAmount = 0 } = (location.state as LocationState) || {};

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card space-y-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 relative animate-scaleIn">
              <CheckCircle className="w-full h-full text-green-500" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
              <p className="text-gray-400">
                Your premium time has been added successfully
              </p>
            </div>

            <div className="w-full max-w-sm space-y-4 bg-gray-900/50 rounded-lg p-6">
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Time Added</div>
                <div className="text-lg font-medium text-white">
                  {formatTimeBreakdown(days)}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Amount Paid</div>
                <div className="text-lg font-medium text-primary-500">
                  {satsAmount.toLocaleString()} sats
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button
                onClick={() => navigate('/payment')}
                className="btn btn-primary flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Top-up Again
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="btn bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};