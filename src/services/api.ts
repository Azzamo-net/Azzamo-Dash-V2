import { UserInfo } from '../types/user';
import { env } from '../config/env';

export const getUserInfo = async (pubkey: string): Promise<UserInfo> => {
  const response = await fetch(`${env.apiBaseUrl}/api/user/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: pubkey,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  return response.json();
};