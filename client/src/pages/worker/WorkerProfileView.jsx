import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import useAuth from '../../hooks/useAuth';
import { LanguageContext } from '../../context/LanguageContext';

const WorkerProfileView = () => {
  const { user, logout } = useAuth();
  const { isHindi, changeLanguage } = useContext(LanguageContext) || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const workerName = user?.name || 'Ramesh Kumar';
  const workerPhone = user?.phone || '+91 98765 43211';
  const workerEmail = user?.email || 'worker.demo@workmate.test';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#138808] to-emerald-400 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {workerName[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1.5">
              {workerName}
              <span className="text-blue-600 text-base" title="Verified Member">✓</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium">{workerEmail} • {workerPhone}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <span className="text-[11px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                Verified Cooperative Member
              </span>
              <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                ITI Electrician
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Cooperative Association & Credentials */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Cooperative Society</h2>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Active Status</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Society Name</span>
            <span className="font-bold text-gray-800">Ranchi Shramik Sahakari Samiti</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Parent Federation</span>
            <span className="font-semibold text-gray-800">Jharkhand State Labour Cooperative Fed.</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Registered District</span>
            <span className="font-semibold text-gray-800">Ranchi, Jharkhand</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Service Coverage Radius</span>
            <span className="font-semibold text-blue-700">15 km (Ranchi & Outskirts)</span>
          </div>
        </div>
      </Card>

      {/* Verification & Compliance Badges */}
      <Card className="p-6 mb-6 shadow-sm border border-gray-200 bg-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Verified Documents & Badges</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
            <span className="text-2xl">🪪</span>
            <div>
              <p className="font-bold text-green-900 text-xs">e-Shram National Card</p>
              <p className="text-[11px] text-green-700">Verified ID: 9842-XXXX-1029</p>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center space-x-3">
            <span className="text-2xl">📜</span>
            <div>
              <p className="font-bold text-blue-900 text-xs">ITI Electrical Certificate</p>
              <p className="text-[11px] text-blue-700">Govt. Certified Trade</p>
            </div>
          </div>

          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center space-x-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <p className="font-bold text-purple-900 text-xs">Cooperative Welfare Pool</p>
              <p className="text-[11px] text-purple-700">2% Automatic Contribution Active</p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center space-x-3">
            <span className="text-2xl">⛑️</span>
            <div>
              <p className="font-bold text-amber-900 text-xs">Safety Kit Certified</p>
              <p className="text-[11px] text-amber-700">Insulated Gloves & Helmet Checked</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Actions */}
      <div className="space-y-3">
        <Button
          variant="primary"
          onClick={() => navigate('/worker/register')}
          className="w-full py-3 bg-[#138808] hover:bg-green-700 text-white font-bold text-sm"
        >
          Update Skills & Service Radius
        </Button>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full py-3 text-red-600 border-red-300 hover:bg-red-50 font-bold text-sm"
        >
          Sign Out / Logout
        </Button>
      </div>
    </div>
  );
};

export default WorkerProfileView;
