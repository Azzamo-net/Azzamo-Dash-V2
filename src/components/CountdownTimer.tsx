import React, { memo } from 'react';
import { Clock } from 'lucide-react';
import { TimeUnit } from './TimeUnit';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownTimerProps {
  minutes: number;
  onExpire?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = memo(({ minutes, onExpire }) => {
  const { days, hours, minutes: mins, seconds } = useCountdown(minutes, onExpire);

  return (
    <div className="card flex flex-col items-center space-y-4">
      <Clock className="w-12 h-12 text-primary-500" />
      <h2 className="text-2xl font-bold text-white">Premium Time Remaining</h2>
      <div className="grid grid-cols-4 gap-4 text-center">
        <TimeUnit value={days} label="Days" />
        <TimeUnit value={hours} label="Hours" />
        <TimeUnit value={mins} label="Minutes" />
        <TimeUnit value={seconds} label="Seconds" />
      </div>
    </div>
  );
});