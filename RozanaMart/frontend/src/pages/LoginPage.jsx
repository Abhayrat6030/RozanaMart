import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!phone || !password) {
      setError('Please fill all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Mock login - replace with API call
      const user = {
        id: '1',
        name: 'User',
        phone: phone,
        email: `user@${phone}`,
      };
      
      const token = 'mock-token-' + Date.now();
      login(user, token);
      
      navigate('/');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Login</h1>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to your RozanaMart account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 font-bold rounded-lg disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <Link
              to="/forgot-password"
              className="text-green-500 text-sm font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          
          <div className="border-t border-gray-300 mt-6 pt-6">
            <p className="text-center text-gray-600 text-sm mb-3">
              Don't have an account?
            </p>
            <Link
              to="/signup"
              className="w-full btn-secondary py-3 font-bold text-center rounded-lg block"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
