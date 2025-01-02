import React from 'react';
import { calculatePrice } from '../utils/pricing';

interface TimeSliderProps {
  value: number;
  onChange: (days: number) => void;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const { discount } = calculatePrice(value);
  
  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between text-sm text-gray-400">
        <span>1 day</span>
        <span>1 year</span>
      </div>
      <input
        type="range"
        min="1"
        max="365"
        value={value}
        onChange={handleChange}
        className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
        style={{
          background: `linear-gradient(to right, #F5A623 0%, #F5A623 ${(value / 365) * 100}%, #374151 ${(value / 365) * 100}%, #374151 100%)`
        }}
      />
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">{value} days</span>
        {discount > 0 && (
          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
            {discount}% discount
          </span>
        )}
      </div>
    </div>
  );
};