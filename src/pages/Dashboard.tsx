import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useUserInfo } from '../hooks/useUserInfo';
import { CountdownTimer } from '../components/CountdownTimer';
import { Navbar } from '../components/Navbar';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserPlan } = useAuthStore();
  const { userInfo } = useUserInfo(user?.pubkey ?? null);

  const premiumTimeRemaining = userInfo?.time_remaining ?? user?.premiumTimeRemaining ?? 0;

  const handleExpire = useCallback(() => {
    updateUserPlan('Free', 0);
  }, [updateUserPlan]);

  const handleAddTime = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <CountdownTimer 
            minutes={premiumTimeRemaining}
            onExpire={handleExpire}
          />
          
          <div className="flex justify-center">
            <button
              onClick={handleAddTime}
              className="btn btn-primary flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Add Premium Time
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};