import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleNostrLogin = async () => {
    try {
      // @ts-ignore
      const pubkey = await window.nostr.getPublicKey();
      await login(pubkey);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-primary-500/20 rounded-full mb-4">
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
              placeholder="npub1... or hex public key"
              className="input"
            />
            <button className="btn btn-primary w-full">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};