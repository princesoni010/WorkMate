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

  const isDemoWorker = user?.email === 'worker.demo@workmate.test';
  const workerName = user?.name || user?.email?.split('@')[0] || 'Worker';

  const earnings = isDemoWorker 
    ? { today: 1080, week: 5400, month: 24800, welfareBalance: 2480 }
    : { today: 0, week: 0, month: 0, welfareBalance: 0 };

  const stats = isDemoWorker
    ? { rating: '4.8 ★', acceptance: '96%', totalJobs: 142 }
    : { rating: '5.0 ★ (New)', acceptance: '100%', totalJobs: 0 };
  
  const activeJob = isDemoWorker ? {
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
  } : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Worker Greeting & Cooperative Badge */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#138808] to-green-400 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-sm">
            {workerName[0]?.toUpperCase() || 'W'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Namaste, {workerName}! 👋</h1>
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
            {isOnline ? 'Active on cooperative matching network for nearby service calls' : 'Turn on to receive instant gig requests'}
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
          <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </Card>

      {/* Real-time Earnings Quick Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card className="p-3.5 text-center border-l-4 border-green-600 bg-white">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Today's Pay</span>
          <div className="text-xl font-black text-gray-900 mt-0.5">₹{earnings.today}</div>
          <span className="text-[10px] text-green-700 font-semibold">90% Direct Share</span>
        </Card>

        <Card className="p-3.5 text-center border-l-4 border-blue-600 bg-white">
          <span className="text-[11px] font-bold text-gray-400 uppercase">This Week</span>
          <div className="text-xl font-black text-gray-900 mt-0.5">₹{earnings.week}</div>
          <span className="text-[10px] text-blue-700 font-semibold">{isDemoWorker ? '10 Jobs' : '0 Jobs'}</span>
        </Card>

        <Card className="p-3.5 text-center border-l-4 border-orange-500 bg-white">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Coop Welfare (2%)</span>
          <div className="text-xl font-black text-orange-600 mt-0.5">₹{earnings.welfareBalance}</div>
          <span className="text-[10px] text-gray-400">Social Security Pool</span>
        </Card>

        <Card className="p-3.5 text-center border-l-4 border-purple-600 bg-white">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Rating / Trust</span>
          <div className="text-xl font-black text-gray-900 mt-0.5">{stats.rating}</div>
          <span className="text-[10px] text-purple-700 font-semibold">{stats.totalJobs} Total Jobs</span>
        </Card>
      </div>

      {/* Active Job / Empty State */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-800">Current Assigned Work Order</h2>
          <span 
            className="text-xs font-bold text-blue-600 cursor-pointer" 
            onClick={() => navigate('/worker/jobs')}
          >
            View All Jobs →
          </span>
        </div>

        {activeJob ? (
          <Card className="p-5 border-2 border-green-500/40 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Live Dispatch
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{activeJob.service}</h3>
                <p className="text-xs text-gray-500">Customer: <strong className="text-gray-800">{activeJob.customer}</strong> • {activeJob.customerPhone}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-green-700">₹{activeJob.earnings}</span>
                <p className="text-[10px] text-gray-400">Your 90% share</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100 mb-4">
              <div>📍 <span className="font-medium text-gray-700">{activeJob.location}</span></div>
              <div>🕒 <span className="font-medium text-gray-700">{activeJob.time}</span></div>
              <div>🛵 Distance: <strong className="text-blue-700">{activeJob.distance}</strong></div>
              <div>🔒 Status: <strong className="text-orange-600 uppercase text-[11px]">{activeJob.status.replace('_', ' ')}</strong></div>
            </div>

            {/* Live Leaflet Map Container */}
            {showLiveMap && (
              <div className="mb-4">
                <WorkerNavigationMap 
                  job={activeJob} 
                  onStatusChange={(id, newStatus) => {
                    activeJob.status = newStatus;
                  }} 
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setShowLiveMap(!showLiveMap)}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center space-x-1"
              >
                <span>🗺️</span>
                <span>{showLiveMap ? 'Hide GPS Map' : 'Open Leaflet Route Navigation'}</span>
              </button>
              <button
                onClick={() => navigate('/worker/jobs')}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition"
              >
                Manage Job
              </button>
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center border-dashed border-2 border-gray-200 bg-white rounded-2xl">
            <div className="text-4xl mb-2">🛵</div>
            <h3 className="text-base font-bold text-gray-800 mb-1">No Active Job Assigned</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
              You are currently <strong>Online</strong>. When a customer in your service radius requests a service, the Fair Matching Engine will dispatch it to you!
            </p>
            <button
              onClick={() => navigate('/worker/jobs')}
              className="px-4 py-2 bg-[#138808] hover:bg-green-700 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Check Job Queue
            </button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;
