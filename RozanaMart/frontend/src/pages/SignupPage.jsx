import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store';

const SignupPage = () => {
  const navigate = useNavigate();
  const signup = useAuthStore(state => state.signup);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.phone || !formData.password) {
      setError('Please fill all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      // Mock signup - replace with API call
      const user = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        email: `user@${formData.phone}`,
      };
      
      const token = 'mock-token-' + Date.now();
      signup(user, token);
      
      navigate('/');
    } catch (err) {
      setError('Signup failed. Please try again.');
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
        <h1 className="text-lg font-bold">Sign Up</h1>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join RozanaMart</h2>
            <p className="text-gray-600">Create your account in seconds</p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="input-field"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 font-bold rounded-lg disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="border-t border-gray-300 mt-6 pt-6">
            <p className="text-center text-gray-600 text-sm mb-3">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="w-full btn-secondary py-3 font-bold text-center rounded-lg block"
            >
              Login
            </Link>
          </div>
          
          <p className="text-center text-xs text-gray-600 mt-4">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-green-500 font-semibold">
              Terms
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-green-500 font-semibold">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
