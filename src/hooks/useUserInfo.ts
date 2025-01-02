import { useState, useEffect } from 'react';
import { UserInfo } from '../types/user';
import { getUserInfo } from '../services/api';
import { env } from '../config/env';

export const useUserInfo = (pubkey: string | null) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!pubkey) return;

    let mounted = true;

    const fetchData = async () => {
      if (retryCount >= env.maxRetries) {
        return;
      }

      setLoading(true);
      try {
        const data = await getUserInfo(pubkey);
        if (mounted) {
          setUserInfo(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            if (mounted && retryCount < env.maxRetries - 1) {
              fetchData();
            }
          }, env.retryDelay);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [pubkey, retryCount]);

  return { userInfo, error, loading };
};