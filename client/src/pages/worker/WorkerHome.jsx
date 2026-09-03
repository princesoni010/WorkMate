import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import useAuth from '../../hooks/useAuth';
import WorkerNavigationMap from '../../components/worker/WorkerNavigationMap';

const WorkerHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [showLiveMap, setShowLiveMap] = useState(false);

  const workerName = user?.name || "Ramesh Kumar";
  const earnings = { today: 1080, week: 5400, month: 24800, welfareBalance: 2480 };
  const stats = { rating: 4.8, acceptance: '96%', totalJobs: 142 };
  
  const activeJob = {
    id: 'WM-849201',
    customer: 'Priya Sharma',
    customerPhone: '9876543210',
    service: 'Electrician - Fan & Wiring Repair',
    location: 'Flat 402, Shanti Kunj, Kanke Road, Ranchi',
    time: 'Today, 2:00 PM',
    earnings: 540,
    distance: '2.3 km',
    lat: 23.3641,
    lng: 85.3296,
    status: 'on_the_way'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Worker Greeting & Cooperative Badge */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#138808] to-green-400 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-sm">
            {workerName[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Namaste, {workerName}!</h1>
            <p className="text-xs text-green-700 font-semibold flex items-center gap-1">
              <span>🤝</span>
              <span>Ranchi Shramik Sahakari Samiti (Verified)</span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-full">
            ITI Certified ✓
          </span>
        </div>
      </div>

      {/* Online / Offline Availability Toggle */}
      <Card className={`p-4 mb-6 flex justify-between items-center transition-colors border ${isOnline ? 'bg-green-50/70 border-green-200' : 'bg-gray-100 border-gray-200'}`}>
        <div>
          <div className="font-extrabold text-base flex items-center gap-2 text-gray-900">
            <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
            {isOnline ? 'You are Online & Available' : 'You are Currently Offline'}
          </div>
          <p className="text-xs text-gray-600 mt-0.5">
            {isOnline ? 'Active on Ranchi matching network for nearby service calls' : 'Turn on to receive instant gig requests'}
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
          <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </Card>

      {/* Active Trip GPS Navigation Feature */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
            <h2 className="font-bold text-gray-900 text-base">Active Job Navigation</h2>
          </div>
          <button
            onClick={() => setShowLiveMap(!showLiveMap)}
            className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 flex items-center space-x-1"
          >
            <span>🗺️</span>
            <span>{showLiveMap ? 'Hide Map' : 'Open Leaflet GPS Route'}</span>
          </button>
        </div>

        {showLiveMap ? (
          <WorkerNavigationMap job={activeJob} />
        ) : (
          <Card className="p-4 border-l-4 border-orange-500 bg-white hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded">
                    🛵 On the Way
                  </span>
                  <span className="text-xs text-gray-400 font-mono">#{activeJob.id}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mt-1">{activeJob.service}</h3>
                <p className="text-xs text-gray-600">📍 {activeJob.location} • <span className="font-bold text-blue-700">{activeJob.distance} away</span></p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowLiveMap(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-1"
                >
                  <span>🗺️</span>
                  <span>Open Route Map</span>
                </button>
                <a
                  href={`tel:${activeJob.customerPhone}`}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  📞 Call
                </a>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Earnings & 2% Welfare Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl md:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-blue-200 font-bold uppercase tracking-wider">Earnings Overview (90% Fair Share)</span>
            <span className="text-xs bg-blue-800 text-blue-200 px-2 py-0.5 rounded-full">Transparent</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-xs text-blue-200">Today</p>
              <p className="text-2xl font-black text-white">₹{earnings.today}</p>
            </div>
            <div>
              <p className="text-xs text-blue-200">This Week</p>
              <p className="text-xl font-bold text-white">₹{earnings.week}</p>
            </div>
            <div>
              <p className="text-xs text-blue-200">This Month</p>
              <p className="text-xl font-bold text-orange-400">₹{earnings.month}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-800/80 flex justify-between items-center text-xs text-blue-200">
            <span>Direct Bank Payouts • Weekly Settlement</span>
            <button onClick={() => navigate('/worker/earnings')} className="text-orange-300 font-bold hover:underline">
              View Detailed Ledger →
            </button>
          </div>
        </Card>

        {/* 2% Cooperative Welfare Fund Card */}
        <Card className="p-4 bg-gradient-to-br from-green-800 to-emerald-900 text-white rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-green-200">2% Welfare Fund</span>
              <span className="text-base">🛡️</span>
            </div>
            <p className="text-2xl font-black text-white">₹{earnings.welfareBalance}</p>
            <p className="text-[11px] text-green-200 mt-1">
              Accumulated collective security pool for health, insurance & training benefits.
            </p>
          </div>

          <button
            onClick={() => navigate('/worker/earnings')}
            className="mt-3 text-xs bg-white/20 hover:bg-white/30 text-white font-bold py-1.5 px-3 rounded-lg text-center"
          >
            Check Welfare Balance
          </button>
        </Card>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Card className="p-4 text-center cursor-pointer hover:bg-orange-50 border border-gray-200 transition" onClick={() => navigate('/worker/jobs')}>
          <div className="text-2xl mb-1">📋</div>
          <div className="font-bold text-xs text-gray-800">All Jobs</div>
        </Card>
        <Card className="p-4 text-center cursor-pointer hover:bg-green-50 border border-gray-200 transition" onClick={() => navigate('/worker/earnings')}>
          <div className="text-2xl mb-1">💰</div>
          <div className="font-bold text-xs text-gray-800">Earnings Ledger</div>
        </Card>
        <Card className="p-4 text-center cursor-pointer hover:bg-blue-50 border border-gray-200 transition" onClick={() => navigate('/worker/register')}>
          <div className="text-2xl mb-1">🛠️</div>
          <div className="font-bold text-xs text-gray-800">Skills & Radius</div>
        </Card>
        <Card className="p-4 text-center cursor-pointer hover:bg-red-50 border border-gray-200 transition" onClick={() => alert('Grievance ticket created. Cooperative Admin assigned.')}>
          <div className="text-2xl mb-1">⚖️</div>
          <div className="font-bold text-xs text-gray-800">Raise Grievance</div>
        </Card>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
        <div className="text-center">
          <div className="font-black text-lg text-orange-500">★ {stats.rating}</div>
          <div className="text-[11px] font-semibold text-gray-500">Rating (142 reviews)</div>
        </div>
        <div className="text-center border-x border-gray-200">
          <div className="font-black text-lg text-green-700">{stats.acceptance}</div>
          <div className="text-[11px] font-semibold text-gray-500">Job Acceptance</div>
        </div>
        <div className="text-center">
          <div className="font-black text-lg text-blue-900">{stats.totalJobs}</div>
          <div className="text-[11px] font-semibold text-gray-500">Jobs Completed</div>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
