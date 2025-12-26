import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, MapPin, Phone, User as UserIcon, Copy } from 'lucide-react';
import { useAuthStore } from '../store';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const referralCode = 'ROZANA' + (user?.phone?.slice(-4) || '0000');
  
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to access your profile</p>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => navigate('/login')}
            className="flex-1 btn-primary py-3"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="flex-1 btn-secondary py-3"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };
  
  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">My Profile</h1>
      </div>
      
      {/* Profile Section */}
      <div className="bg-white p-4 m-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{user?.name || 'User'}</h2>
            <p className="text-sm text-gray-600">{user?.phone || 'Not provided'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
      
      {/* Personal Information */}
      <div className="bg-white p-4 m-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Personal Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <UserIcon size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-600">Full Name</p>
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-600">Phone Number</p>
              <p className="text-sm font-semibold text-gray-900">{user?.phone || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-600">Address</p>
              <p className="text-sm font-semibold text-gray-900">{user?.address || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Referral Program */}
      <div className="bg-white p-4 m-4 rounded-lg shadow-sm border-l-4 border-green-500">
        <h3 className="font-bold text-gray-900 mb-2">Refer & Earn</h3>
        <p className="text-xs text-gray-600 mb-3">Share your code and earn rewards on every referral</p>
        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg mb-3">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 bg-transparent font-mono font-bold text-gray-900 outline-none"
          />
          <button
            onClick={handleCopyReferral}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
          >
            <Copy size={18} className="text-green-500" />
          </button>
        </div>
        {copied && <p className="text-xs text-green-600 font-semibold">✓ Copied!</p>}
        <button className="w-full text-green-500 border border-green-500 py-2 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors">
          Share via WhatsApp
        </button>
      </div>
      
      {/* Wallet / Balance */}
      <div className="bg-white p-4 m-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Wallet</h3>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg mb-3">
          <p className="text-xs opacity-90 mb-1">Available Balance</p>
          <p className="text-2xl font-bold">₹0</p>
        </div>
        <p className="text-xs text-gray-600">Earn balance from referrals and complete special tasks</p>
      </div>
      
      {/* Settings & Legal */}
      <div className="bg-white p-4 m-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Legal & Help</h3>
        <div className="space-y-2">
          <button
            onClick={() => navigate('/terms')}
            className="w-full text-left p-3 text-gray-900 hover:bg-gray-50 rounded transition-colors"
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => navigate('/privacy')}
            className="w-full text-left p-3 text-gray-900 hover:bg-gray-50 rounded transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => navigate('/refund')}
            className="w-full text-left p-3 text-gray-900 hover:bg-gray-50 rounded transition-colors"
          >
            Refund Policy
          </button>
          <button
            onClick={() => navigate('/cancellation')}
            className="w-full text-left p-3 text-gray-900 hover:bg-gray-50 rounded transition-colors"
          >
            Cancellation Policy
          </button>
        </div>
      </div>
      
      {/* App Version */}
      <div className="text-center py-4 text-xs text-gray-500">
        <p>RozanaMart v1.0.0</p>
        <p>Roz ka saman, ghar tak</p>
      </div>
    </div>
  );
};

export default ProfilePage;
