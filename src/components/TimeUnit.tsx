import React from 'react';

interface TimeUnitProps {
  value: number;
  label: string;
}

export const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <div className="flex flex-col">
    <span className="text-4xl font-bold text-primary-500">{value}</span>
    <span className="text-gray-400">{label}</span>
  </div>
);