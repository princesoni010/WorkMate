import React, { useState } from 'react';
import { Sidebar } from '../../components/layout';
import { Card, Button } from '../../components/common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Forecast = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Ranchi District');
  const [reallocatedMap, setReallocatedMap] = useState({});

  const data = [
    { service: 'Electrician', expected: 120, current: 85, surplusDeficit: -35 },
    { service: 'Plumber', expected: 90, current: 70, surplusDeficit: -20 },
    { service: 'AC / Tech', expected: 150, current: 40, surplusDeficit: -110 },
    { service: 'Carpenter', expected: 60, current: 55, surplusDeficit: -5 },
    { service: 'Painter', expected: 110, current: 80, surplusDeficit: -30 },
  ];

  const reallocationRecommendations = [
    {
      id: 'REC-01',
      service: 'Electricians (12 Workers)',
      fromZone: 'Ward 12 (Harmu Housing Colony)',
      fromStatus: 'Surplus (+18 Idle Workers)',
      toZone: 'Ward 4 (Kanke Road & Morabadi)',
      toStatus: 'High Deficit (-35 Bookings Backlog)',
      urgency: 'High',
      expectedImpact: '+32% Faster Fulfillment, ₹64,800 Extra Worker Earnings'
    },
    {
      id: 'REC-02',
      service: 'AC & Appliance Techs (8 Workers)',
      fromZone: 'Raipur Federation Hub',
      fromStatus: 'Low Seasonal Load',
      toZone: 'Ranchi Central Business District',
      toStatus: 'Seasonal Heatwave Spike (+110 Bookings)',
      urgency: 'Critical',
      expectedImpact: 'Prevents Customer Drop-offs, 100% Demand Met'
    },
    {
      id: 'REC-03',
      service: 'Plumbers & Cleaners (15 Workers)',
      fromZone: 'Ward 18 (Dhurwa Sector)',
      fromStatus: 'Optimal Capacity',
      toZone: 'Ward 2 (Bariatu Medical Enclave)',
      toStatus: 'Monsoon Pipeline Leakage Surge',
      urgency: 'Medium',
      expectedImpact: 'Balanced Workload across Cooperatives'
    }
  ];

  const handleTriggerReallocation = (recId) => {
    setReallocatedMap(prev => ({ ...prev, [recId]: true }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Predictive AI Governance</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">AI Demand Forecasting & Workforce Re-Allocation</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              7-Day time-series predictive modeling based on historical cooperative work orders and seasonal surges.
            </p>
          </div>

          <div className="flex gap-2">
            <select 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-2 border border-gray-300 rounded-xl bg-white text-xs font-bold shadow-sm"
            >
              <option>Ranchi District (Jharkhand)</option>
              <option>Raipur District (Chhattisgarh)</option>
              <option>Dhanbad Industrial Cluster</option>
            </select>
          </div>
        </div>

        {/* Top KPI Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Card className="p-5 border-l-4 border-red-500 bg-red-50/50 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">Critical Demand Spike</span>
              <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded font-bold">Alert</span>
            </div>
            <h3 className="font-extrabold text-xl text-gray-900 mt-2">AC & Appliance Repair</h3>
            <div className="text-2xl font-black text-red-600 mt-1">150 Expected</div>
            <p className="text-xs text-red-700 mt-1">Deficit: <span className="font-bold">-110 workers short</span> in Ward 4</p>
          </Card>
          
          <Card className="p-5 border-l-4 border-orange-500 bg-orange-50/50 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700">Upcoming Festival Surge</span>
              <span className="text-xs bg-orange-200 text-orange-800 px-2 py-0.5 rounded font-bold">In 14 Days</span>
            </div>
            <h3 className="font-extrabold text-xl text-gray-900 mt-2">Deep Cleaning & Painting</h3>
            <div className="text-2xl font-black text-orange-600 mt-1">+45% Demand</div>
            <p className="text-xs text-orange-700 mt-1">Mobilization needed across Mahila Samitis</p>
          </Card>
          
          <Card className="p-5 border-l-4 border-green-500 bg-green-50/50 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-green-700">Workforce Balance Index</span>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded font-bold">92%</span>
            </div>
            <h3 className="font-extrabold text-xl text-gray-900 mt-2">Inter-Society Mobility</h3>
            <div className="text-2xl font-black text-green-700 mt-1">35 Available</div>
            <p className="text-xs text-green-800 mt-1">Idle workers ready for cross-ward reallocation</p>
          </Card>
        </div>

        {/* 🤖 AUTOMATED WORKFORCE RE-ALLOCATION RECOMMENDATIONS (The exact AI Feature) */}
        <Card className="p-6 mb-8 border border-blue-200 bg-gradient-to-br from-white to-blue-50/30 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🤖</span>
                <h3 className="font-bold text-base text-blue-950">
                  Automated Workforce Re-Allocation Recommendations (AI Dispatch)
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                AI detects surplus workers in low-demand societies and recommends cross-ward shifts to eliminate service bottlenecks.
              </p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded-full border border-blue-200">
              3 AI Suggestions Active
            </span>
          </div>

          <div className="space-y-4">
            {reallocationRecommendations.map((rec) => {
              const isDispatched = reallocatedMap[rec.id];
              return (
                <div 
                  key={rec.id} 
                  className={`p-4 rounded-xl border transition ${
                    isDispatched 
                      ? 'bg-green-50 border-green-300' 
                      : 'bg-white border-gray-200 hover:border-blue-300 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-gray-900">{rec.service}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          rec.urgency === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {rec.urgency} Urgency
                        </span>
                        {isDispatched && (
                          <span className="text-[10px] bg-green-200 text-green-900 font-bold px-2 py-0.5 rounded">
                            ✓ Dispatch Dispatched via SMS & App
                          </span>
                        )}
                      </div>

                      {/* Source vs Target Shift Pathway */}
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium border border-gray-200">
                          📍 Source: <strong className="text-gray-900">{rec.fromZone}</strong> ({rec.fromStatus})
                        </span>
                        <span className="text-blue-600 font-bold">➔ SHIFT TO ➔</span>
                        <span className="bg-blue-50 text-blue-900 px-2.5 py-1 rounded-lg font-medium border border-blue-200">
                          🎯 Target: <strong className="text-blue-950">{rec.toZone}</strong> ({rec.toStatus})
                        </span>
                      </div>

                      <p className="text-xs text-green-700 font-semibold">
                        💡 Projected Impact: {rec.expectedImpact}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center space-x-2">
                      {isDispatched ? (
                        <button
                          disabled
                          className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold opacity-90 cursor-default"
                        >
                          ✓ Reallocated & On-Call
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTriggerReallocation(rec.id)}
                          className="px-4 py-2 bg-[#FF9933] hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1"
                        >
                          <span>⚡</span>
                          <span>Approve & Shift Workers</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Visual Demand vs Capacity Chart */}
        <Card className="p-6 mb-8 border border-gray-200 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-base text-gray-800">Predicted Demand vs Current Active Workforce</h3>
              <p className="text-xs text-gray-500">Comparing expected bookings with verified worker capacity in {selectedDistrict}</p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-semibold">
              <span className="flex items-center"><span className="w-3 h-3 bg-[#FF9933] rounded mr-1.5"></span>Expected Bookings</span>
              <span className="flex items-center"><span className="w-3 h-3 bg-blue-600 rounded mr-1.5"></span>Current Active Workers</span>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="service" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="expected" name="Expected Bookings (Demand)" fill="#FF9933" radius={[6, 6, 0, 0]} />
                <Bar dataKey="current" name="Current Active Workers (Supply)" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Actionable Tabular Breakdown */}
        <Card className="p-6 border border-gray-200 shadow-sm bg-white">
          <h3 className="font-bold text-base text-gray-800 mb-4">District-Wise Capacity & Action Grid</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-600 font-bold">
                  <th className="p-3">Service Trade</th>
                  <th className="p-3">7-Day Trend</th>
                  <th className="p-3">Expected Demand</th>
                  <th className="p-3">Active Supply</th>
                  <th className="p-3">Gap Status</th>
                  <th className="p-3">AI Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row) => (
                  <tr key={row.service} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-gray-900">{row.service}</td>
                    <td className="p-3 font-semibold text-red-600">↗ Surge (+28%)</td>
                    <td className="p-3 font-bold">{row.expected} orders</td>
                    <td className="p-3 font-medium text-gray-700">{row.current} workers</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        row.surplusDeficit < -20 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {row.surplusDeficit < 0 ? `Deficit (${row.surplusDeficit})` : 'Optimal'}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-blue-900">
                      {row.surplusDeficit < -20 
                        ? 'Trigger Inter-Society Reallocation' 
                        : 'Maintain current on-call schedules'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Forecast;
