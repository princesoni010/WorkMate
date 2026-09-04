import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import useAuth from '../../hooks/useAuth';
import { LanguageContext } from '../../context/LanguageContext';

const WorkerProfileView = () => {
  const { user, logout } = useAuth();
  const { isHindi, changeLanguage } = useContext(LanguageContext) || {};
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem('worker_avatar') || null
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePhoto(url);
      localStorage.setItem('worker_avatar', url);
    }
  };

  const isDemo = user?.email === 'worker.demo@workmate.test';
  const workerName = user?.name || user?.email?.split('@')[0] || 'Worker';
  const workerPhone = user?.phone || 'Not provided';
  const workerEmail = user?.email || 'Registered Worker';

  const societyName = isDemo ? 'Ranchi Shramik Sahakari Samiti' : (user?.cooperativeName || 'Ranchi Shramik Sahakari Samiti');
  const rcsNo = isDemo ? 'RCS/JHR/2023/LCS-402' : (user?.rcsNo || 'RCS/JHR/2023/LCS-402');
  const memberId = isDemo ? 'MEM-88219' : (user?.memberId || 'MEM-' + Math.floor(10000 + Math.random() * 90000));
  const welfareBalance = isDemo ? '₹1,440.00' : (user?.welfareBalance ? `₹${user.welfareBalance}` : '₹0.00');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Hidden File Input for Native Camera / Gallery Picker */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        onChange={handlePhotoUpload} 
        className="hidden" 
      />

      {/* Profile Header */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#138808] to-emerald-400 text-white font-black text-2xl flex items-center justify-center shadow-md cursor-pointer relative overflow-hidden group hover:ring-4 hover:ring-green-100 transition"
            title="Click to change profile photo from gallery"
          >
            {profilePhoto ? (
              <img src={profilePhoto} alt={workerName} className="w-full h-full object-cover" />
            ) : (
              <span>{workerName[0]?.toUpperCase() || 'W'}</span>
            )}
            <div className="absolute inset-0 bg-black/40 text-white text-[9px] font-bold flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span>📷</span>
              <span>Edit</span>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1.5">
              {workerName}
              <span className="text-blue-600 text-base" title="Verified Member">✓</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium">{workerEmail} • {workerPhone}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <span className="text-[11px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                {isDemo ? 'Verified Cooperative Member' : 'Active Registered Worker'}
              </span>
              <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                ITI Certified
              </span>
            </div>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hidden sm:block"
          >
            📷 Upload Photo
          </button>
        </div>
      </Card>

      {/* Cooperative Association & Credentials */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Cooperative Society</h2>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Active Member</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Society Name</span>
            <span className="font-bold text-gray-800">{societyName}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">RCS State Reg No</span>
            <span className="font-mono font-bold text-purple-700">{rcsNo}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Cooperative Member Passbook</span>
            <span className="font-mono font-semibold text-gray-800">{memberId}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Parent Federation</span>
            <span className="font-semibold text-gray-800">Jharkhand State Labour Fed</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Assigned Service Radius</span>
            <span className="font-bold text-blue-700">12 km (Ranchi District)</span>
          </div>
        </div>
      </Card>

      {/* Language & Preference */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Preferences & Welfare</h2>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
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

        <div className="flex justify-between items-center py-2">
          <div>
            <p className="text-sm font-semibold text-gray-800">Welfare Ledger Balance</p>
            <p className="text-xs text-gray-400">Your accumulated 2% collective social security credit</p>
          </div>
          <span className="text-base font-black text-green-700">{welfareBalance}</span>
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

export default WorkerProfileView;
