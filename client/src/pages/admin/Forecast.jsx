import React from 'react';
import { Sidebar } from '../../components/layout';
import { Card } from '../../components/common';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Forecast = () => {
  const data = [
    { service: 'Electrician', expected: 120, current: 85 },
    { service: 'Plumber', expected: 90, current: 70 },
    { service: 'AC Repair', expected: 150, current: 40 }, // Seasonal spike
    { service: 'Carpenter', expected: 60, current: 55 },
    { service: 'Painter', expected: 110, current: 80 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Demand Forecast (Next 30 Days)</h1>
          <p className="text-gray-500">Planning forecast based on booking history and seasonal trends. This does not guarantee demand.</p>
        </div>

        <div className="flex gap-4 mb-6">
          <select className="p-2 border rounded-lg bg-white"><option>All Services</option></select>
          <select className="p-2 border rounded-lg bg-white"><option>Ranchi District</option></select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-5 border-l-4 border-red-500 bg-red-50">
            <h3 className="font-bold text-red-800 mb-1">High Demand Alert</h3>
            <p className="text-sm text-gray-700">AC Repair in Sector 4</p>
            <div className="text-2xl font-bold mt-2">150 expected</div>
            <p className="text-xs text-red-600 mt-1">Recommendation: Mobilize 20+ workers</p>
          </Card>
          
          <Card className="p-5 border-l-4 border-orange-500">
            <h3 className="font-bold text-gray-700 mb-1">Upcoming Festival Spike</h3>
            <p className="text-sm text-gray-700">Painting & Cleaning</p>
            <div className="text-2xl font-bold mt-2">+45% demand</div>
            <p className="text-xs text-gray-500 mt-1">Starts in 15 days</p>
          </Card>
          
          <Card className="p-5 border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-700 mb-1">Supply Gap</h3>
            <p className="text-sm text-gray-700">Appliance Repair</p>
            <div className="text-2xl font-bold mt-2">12 workers short</div>
            <p className="text-xs text-gray-500 mt-1">Recommendation: Target recruitment</p>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Expected Demand by Service Type vs Current Capacity</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expected" name="Expected Bookings" fill="#ff7f50" />
                <Bar dataKey="current" name="Current Active Workers" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Forecast Data Details</h3>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600">
                <th className="p-3">Service</th>
                <th className="p-3">Trend</th>
                <th className="p-3">Expected Demand</th>
                <th className="p-3">Capacity Status</th>
                <th className="p-3">Action Required</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-3 font-semibold">AC Repair</td>
                <td className="p-3 text-red-500">↗ High (Seasonal)</td>
                <td className="p-3">150 bookings</td>
                <td className="p-3 text-red-500">Deficit (-110)</td>
                <td className="p-3">Recruit immediately</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Electrician</td>
                <td className="p-3 text-green-500">→ Stable</td>
                <td className="p-3">120 bookings</td>
                <td className="p-3 text-green-600">Optimal</td>
                <td className="p-3">None</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
};

export default Forecast;
