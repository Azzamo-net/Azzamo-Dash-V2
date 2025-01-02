import React from 'react';
import { formatTimeBreakdown } from '../utils/timeFormat';

interface PriceDisplayProps {
  days: number;
  finalPrice: number;
  basePrice: number;
  discount: number;
  showTimeBreakdown?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  days,
  finalPrice,
  basePrice,
  discount,
  showTimeBreakdown = false
}) => (
  <div className="mt-6 space-y-2">
    {showTimeBreakdown && (
      <div className="text-lg text-gray-400 mb-2">
        {formatTimeBreakdown(days)}
      </div>
    )}
    <div className="text-3xl font-bold text-primary-500">
      {finalPrice.toLocaleString()} sats
    </div>
    {discount > 0 && (
      <div className="text-sm text-gray-400 line-through">
        {basePrice.toLocaleString()} sats
      </div>
    )}
  </div>
);