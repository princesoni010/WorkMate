import React from 'react';
import { Sidebar } from '../../components/layout';
import { Card } from '../../components/common';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WelfareLedger = () => {
  const pieData = [
    { name: 'Ranchi Electricians', value: 45000 },
    { name: 'Jharkhand Plumbers', value: 30000 },
    { name: 'Mahila Samiti', value: 20000 },
    { name: 'Other Coops', value: 10000 },
  ];
  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];

  const ledger = [
    { id: 1, date: '2026-09-03', worker: 'Ramesh K.', bookingId: 'WM-10023', amount: 9, type: 'Credit', desc: 'Booking Contribution (2%)' },
    { id: 2, date: '2026-09-02', worker: 'Sunita D.', bookingId: 'WM-10015', amount: 12, type: 'Credit', desc: 'Booking Contribution (2%)' },
    { id: 3, date: '2026-08-28', worker: 'Coop Admin', bookingId: '-', amount: -5000, type: 'Debit', desc: 'Medical Emergency Payout' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welfare Ledger</h1>
          <p className="text-gray-500">Proposed welfare mechanism - tracking contributions for future cooperative programs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-orange-50 border-orange-200">
            <h3 className="text-orange-800 font-semibold mb-1">Total Contributions</h3>
            <div className="text-3xl font-bold text-orange-600">₹1,05,000</div>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-500 font-semibold mb-1">This Month</h3>
            <div className="text-3xl font-bold">₹12,450</div>
          </Card>
          <Card className="p-6">
            <h3 className="text-gray-500 font-semibold mb-1">Contributing Workers</h3>
            <div className="text-3xl font-bold">1,245</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Transaction Ledger</h3>
              <div className="flex gap-2">
                <select className="p-1.5 border rounded text-sm"><option>All Coops</option></select>
                <select className="p-1.5 border rounded text-sm"><option>This Month</option></select>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr className="text-gray-600">
                    <th className="p-3">Date</th>
                    <th className="p-3">Worker</th>
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {ledger.map(row => (
                    <tr key={row.id}>
                      <td className="p-3">{row.date}</td>
                      <td className="p-3">{row.worker}</td>
                      <td className="p-3 text-blue-600">{row.bookingId}</td>
                      <td className="p-3 text-gray-500">{row.desc}</td>
                      <td className={`p-3 font-bold ${row.type === 'Credit' ? 'text-green-600' : 'text-red-500'}`}>
                        {row.type === 'Credit' ? '+' : ''}{row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 flex flex-col">
            <h3 className="font-bold text-lg mb-4">Contributions by Coop</h3>
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default WelfareLedger;
