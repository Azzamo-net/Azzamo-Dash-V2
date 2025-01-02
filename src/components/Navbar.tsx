import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-white">Premium Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-4 py-2 rounded-full ${
              user?.plan === 'Premium' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-700 text-gray-300'
            }`}>
              {user?.plan}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-300 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};