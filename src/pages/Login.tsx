import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { parseNostrKey } from '../utils/nostr';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [manualKey, setManualKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNostrLogin = async () => {
    try {
      // @ts-ignore
      const pubkey = await window.nostr.getPublicKey();
      await login(pubkey);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Nostr login failed. Please try again or use manual login.');
    }
  };

  const handleManualLogin = async () => {
    const pubkey = parseNostrKey(manualKey.trim());
    if (!pubkey) {
      setError('Invalid public key format. Please enter a valid npub or hex public key.');
      return;
    }

    try {
      await login(pubkey);
      navigate('/dashboard');
    } catch (error) {
      console.error('Manual login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-start justify-center pt-16 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-primary-500/20 rounded-full mb-3">
            <Zap className="w-12 h-12 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Azzamo Premium dashboard</h1>
          <p className="text-gray-400">
            Top-up your Azzamo premium time
          </p>
        </div>

        <div className="card space-y-6">
          <div className="flex items-center gap-3 text-xl font-semibold text-white">
            <Zap className="w-6 h-6 text-primary-500" />
            <span>Nostr Login</span>
          </div>

          <button
            onClick={handleNostrLogin}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Sign in with Nostr
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or enter manually</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Enter your Nostr public key or npub
            </label>
            <input
              type="text"
              value={manualKey}
              onChange={(e) => {
                setManualKey(e.target.value);
                setError(null);
              }}
              placeholder="npub1... or hex public key"
              className="input"
            />
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <button 
              onClick={handleManualLogin}
              className="btn btn-primary w-full"
              disabled={!manualKey.trim()}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
