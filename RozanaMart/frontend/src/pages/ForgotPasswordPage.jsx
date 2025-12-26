import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock OTP sending
      alert('OTP sent to ' + phone);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock OTP verification
      setStep(3);
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock password reset
      alert('Password reset successful!');
      navigate('/login');
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
        <h1 className="text-lg font-bold">Reset Password</h1>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Phone Number</h2>
              <p className="text-gray-600 mb-6">We'll send you an OTP to reset your password</p>
              <form onSubmit={handleSendOTP} className="space-y-4">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="input-field"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 font-bold rounded-lg"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            </>
          )}
          
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
              <p className="text-gray-600 mb-6">Check your SMS for the OTP</p>
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="input-field text-center tracking-widest"
                  maxLength="6"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 font-bold rounded-lg"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            </>
          )}
          
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Password</h2>
              <p className="text-gray-600 mb-6">Enter your new password</p>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="input-field"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 font-bold rounded-lg"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
