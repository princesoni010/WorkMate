import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Button } from '../../components/common';
import useAuth from '../../hooks/useAuth';
import { LanguageContext } from '../../context/LanguageContext';

const CustomerProfile = () => {
  const { user, logout } = useAuth();
  const { language, changeLanguage, isHindi } = useContext(LanguageContext) || {};
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const customerName = user?.name || user?.email?.split('@')[0] || 'Customer';
  const customerEmail = user?.email || 'Registered User';
  const customerPhone = user?.phone || 'Not provided';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Profile Header Card */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF9933] to-amber-400 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {customerName[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{customerName}</h1>
            <p className="text-xs text-gray-500 font-medium">{customerEmail}</p>
            <span className="inline-block mt-1 text-[11px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full">
              WorkMate Verified Account
            </span>
          </div>
          <button
            onClick={() => navigate('/customer/bookings')}
            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
          >
            My Bookings
          </button>
        </div>
      </Card>

      {/* Account Details */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Account Information</h2>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Full Name</span>
            <span className="font-semibold text-gray-800">{customerName}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Email Address</span>
            <span className="font-semibold text-gray-800">{customerEmail}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Phone Number</span>
            <span className="font-semibold text-gray-800">{customerPhone}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Primary Service District</span>
            <span className="font-semibold text-gray-800">Ranchi, Jharkhand</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Account Type</span>
            <span className="font-bold text-green-700">Household Customer</span>
          </div>
        </div>
      </Card>

      {/* Language & Preference */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Preferences</h2>
        
        <div className="flex justify-between items-center py-2">
          <div>
            <p className="text-sm font-semibold text-gray-800">App Language</p>
            <p className="text-xs text-gray-400">Choose between Hindi and English</p>
          </div>
          <button
            onClick={() => changeLanguage && changeLanguage(isHindi ? 'en' : 'hi')}
            className="px-3 py-1.5 text-xs font-bold bg-orange-50 text-[#FF9933] border border-orange-200 rounded-lg hover:bg-orange-100"
          >
            {isHindi ? 'हिन्दी (Active)' : 'English (Active)'}
          </button>
        </div>
      </Card>

      {/* Logout Action */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full py-3 text-red-600 border-red-200 hover:bg-red-50 font-bold text-sm"
          onClick={handleLogout}
        >
          Logout from WorkMate
        </Button>
      </div>
    </div>
  );
};

export default CustomerProfile;
