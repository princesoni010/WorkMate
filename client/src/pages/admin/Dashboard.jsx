import React from 'react';
import { Sidebar } from '../../components/layout';
import { Card } from '../../components/common';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const lineData = [
    { month: 'Jan', bookings: 400 },
    { month: 'Feb', bookings: 300 },
    { month: 'Mar', bookings: 550 },
    { month: 'Apr', bookings: 480 },
    { month: 'May', bookings: 700 },
    { month: 'Jun', bookings: 850 },
  ];

  const pieData = [
    { name: 'Electrician', value: 400 },
    { name: 'Plumber', value: 300 },
    { name: 'Carpenter', value: 300 },
    { name: 'Others', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex gap-4">
            <select className="p-2 border rounded-lg bg-white">
              <option>Ranchi District</option>
              <option>All Districts</option>
            </select>
            <select className="p-2 border rounded-lg bg-white">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
        </div>

        {/* Metrics Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Active Workers</p>
                <h3 className="text-3xl font-bold mt-1">1,245</h3>
              </div>
              <div className="text-3xl text-blue-500">👷</div>
            </div>
          </Card>
          
          <Card className="p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Total Bookings</p>
                <h3 className="text-3xl font-bold mt-1">8,432</h3>
              </div>
              <div className="text-3xl text-green-500">📅</div>
            </div>
          </Card>
          
          <Card className="p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Platform Revenue</p>
                <h3 className="text-3xl font-bold mt-1">₹4.2L</h3>
              </div>
              <div className="text-3xl text-yellow-500">₹</div>
            </div>
          </Card>
          
          <Card className="p-6 border-l-4 border-orange-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Welfare Fund</p>
                <h3 className="text-3xl font-bold mt-1">₹1.05L</h3>
              </div>
              <div className="text-3xl text-orange-500">❤️</div>
            </div>
          </Card>
        </div>

        {/* Metrics Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 flex items-center gap-4 bg-yellow-50 border-yellow-200">
            <div className="bg-yellow-200 p-3 rounded-full text-xl">⏳</div>
            <div>
              <p className="text-gray-600 font-semibold">Pending Verifications</p>
              <h4 className="text-2xl font-bold">24</h4>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4 bg-red-50 border-red-200">
            <div className="bg-red-200 p-3 rounded-full text-xl">⚠️</div>
            <div>
              <p className="text-gray-600 font-semibold">Open Grievances</p>
              <h4 className="text-2xl font-bold">7</h4>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Bookings Trend (Last 6 Months)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Services by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Tables placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1,2,3,4,5].map(i => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3">WM-100{i+20}</td>
                      <td className="py-3">Electrician</td>
                      <td className="py-3">Vikas S.</td>
                      <td className="py-3">₹450</td>
                      <td className="py-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completed</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Top Workers</h3>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs">W</div>
                    <div>
                      <p className="font-semibold text-sm">Ramesh Kumar</p>
                      <p className="text-xs text-gray-500">Electrician</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-orange-500">4.9 ★</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
