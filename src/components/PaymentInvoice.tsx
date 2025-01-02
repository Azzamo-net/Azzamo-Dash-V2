import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { shortenInvoice } from '../utils/format';
import { formatTimeRemaining } from '../utils/timeFormat';

interface PaymentInvoiceProps {
  invoice: string;
  onOpenWallet: () => void;
  loading: boolean;
  isExpired: boolean;
  timeRemaining: number | null;
  onNewInvoice: () => void;
}

export const PaymentInvoice: React.FC<PaymentInvoiceProps> = ({ 
  invoice, 
  onOpenWallet,
  loading,
  isExpired,
  timeRemaining,
  onNewInvoice
}) => {
  const shortInvoice = shortenInvoice(invoice);

  if (isExpired) {
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-yellow-500" />
          <div>
            <h3 className="text-lg font-medium text-white">Invoice Expired</h3>
            <p className="text-gray-400 mt-1">This invoice is no longer valid</p>
          </div>
          <button
            onClick={onNewInvoice}
            className="btn btn-primary"
          >
            Generate New Invoice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 p-4 rounded-lg">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${invoice}`}
          alt="Lightning Invoice QR Code"
          className="w-full max-w-[300px] mx-auto"
        />
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-400">Lightning Invoice:</div>
        <div className="bg-gray-900 p-3 rounded-lg flex items-center gap-2">
          <code className="font-mono text-sm text-gray-300">{shortInvoice}</code>
          <button 
            onClick={() => navigator.clipboard.writeText(invoice)}
            className="p-1 hover:text-primary-500 ml-auto"
            title="Copy full invoice"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </button>
        </div>
      </div>

      {timeRemaining !== null && timeRemaining > 0 && (
        <div className="text-center text-sm text-gray-400">
          Expires in {formatTimeRemaining(timeRemaining)}
        </div>
      )}

      <button 
        onClick={onOpenWallet}
        disabled={loading}
        className="btn btn-primary w-full flex items-center justify-center gap-2"
      >
        <Zap className="w-5 h-5" />
        Open in Wallet
      </button>

      <div className="text-center text-gray-400">
        {loading ? 'Processing payment...' : 'Waiting for payment...'}
      </div>
    </div>
  );
};