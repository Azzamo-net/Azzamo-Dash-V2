import React from 'react';
import { CheckCircle } from 'lucide-react';

export const PaymentSuccess: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4 animate-fadeIn">
    <div className="w-16 h-16 relative animate-scaleIn">
      <CheckCircle className="w-full h-full text-green-500" />
    </div>
    <h2 className="text-xl font-semibold text-white">Payment Successful!</h2>
    <p className="text-gray-400">Redirecting...</p>
  </div>
);
