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

  const customerName = user?.name || 'Priya Sharma';
  const customerEmail = user?.email || 'customer.demo@workmate.test';
  const customerPhone = user?.phone || '+91 98765 43210';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Profile Header Card */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF9933] to-amber-400 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {customerName[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{customerName}</h1>
            <p className="text-xs text-gray-500 font-medium">{customerEmail}</p>
            <span className="inline-block mt-1 text-[11px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full">
              WorkMate Household Member
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
            <span className="text-gray-500">Phone Number</span>
            <span className="font-semibold text-gray-800">{customerPhone}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Primary Service District</span>
            <span className="font-semibold text-gray-800">Ranchi, Jharkhand</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Saved Address</span>
            <span className="font-semibold text-gray-800 text-right">Flat 402, Shanti Kunj, Kanke Road</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Associated Cooperative</span>
            <span className="font-semibold text-green-700">Ranchi Shramik Sahakari Samiti</span>
          </div>
        </div>
      </Card>

      {/* App Preferences & Language */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Preferences & Localization</h2>
        
        <div className="flex justify-between items-center py-2">
          <div>
            <p className="font-semibold text-gray-800 text-sm">App Language / भाषा</p>
            <p className="text-xs text-gray-500">Choose between English and Hindi</p>
          </div>
          <button
            type="button"
            onClick={() => changeLanguage && changeLanguage(isHindi ? 'en' : 'hi')}
            className="px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg text-xs font-bold hover:bg-orange-100"
          >
            {isHindi ? 'हिन्दी (Hindi) ✓' : 'English ✓'}
          </button>
        </div>
      </Card>

      {/* Support & Grievance */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Worker & Community Welfare</h2>
        <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-xs text-green-900 space-y-1">
          <p className="font-bold">Your Impact on Local Welfare:</p>
          <p>Every booking through WorkMate contributes 2% to the cooperative social security & emergency fund.</p>
        </div>

        <div className="mt-4 flex space-x-3">
          <button
            onClick={() => alert('Cooperative Customer Support: 1800-NCCT-COOP (Toll Free)')}
            className="flex-1 py-2 text-xs font-bold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Help & FAQs
          </button>
          <button
            onClick={() => alert('New ticket created. Cooperative grievance officer assigned.')}
            className="flex-1 py-2 text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
          >
            Raise Support Ticket
          </button>
        </div>
      </Card>

      {/* Logout Action */}
      <Button
        variant="outline"
        onClick={handleLogout}
        className="w-full py-3 text-red-600 border-red-300 hover:bg-red-50 font-bold text-sm"
      >
        Sign Out / Logout
      </Button>
    </div>
  );
};

export default CustomerProfile;
