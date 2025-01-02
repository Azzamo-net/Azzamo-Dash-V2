export interface User {
  id: string;
  pubkey: string;
  plan: 'Free' | 'Premium';
  premiumTimeRemaining: number;
}

export interface UserInfo {
  pubkey: string;
  npub: string;
  time_remaining: number;
  is_whitelisted: boolean;
}