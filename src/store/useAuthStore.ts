import { create } from 'zustand';
import { User } from '../types/user';
import { getUserInfo } from '../services/api';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (pubkey: string) => Promise<void>;
  logout: () => void;
  updateUserPlan: (plan: 'Free' | 'Premium', timeRemaining: number) => void;
  refreshUserInfo: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (pubkey: string) => {
    try {
      const userInfo = await getUserInfo(pubkey);
      set({ 
        user: {
          id: pubkey,
          pubkey: userInfo.pubkey,
          plan: userInfo.time_remaining > 0 ? 'Premium' : 'Free',
          premiumTimeRemaining: userInfo.time_remaining,
        }, 
        isAuthenticated: true 
      });
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      set({ 
        user: {
          id: pubkey,
          pubkey,
          plan: 'Free',
          premiumTimeRemaining: 0
        }, 
        isAuthenticated: true 
      });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUserPlan: (plan, timeRemaining) => 
    set(state => state.user ? {
      user: {
        ...state.user,
        plan,
        premiumTimeRemaining: timeRemaining
      }
    } : state),
  refreshUserInfo: async () => {
    const state = get();
    if (state.user?.pubkey) {
      try {
        const userInfo = await getUserInfo(state.user.pubkey);
        set({
          user: {
            ...state.user,
            plan: userInfo.time_remaining > 0 ? 'Premium' : 'Free',
            premiumTimeRemaining: userInfo.time_remaining,
          }
        });
      } catch (error) {
        console.error('Failed to refresh user info:', error);
      }
    }
  }
}));