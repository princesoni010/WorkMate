import React from 'react';
import { Navbar, BottomNav } from '../../components/layout';
import { Card, Button } from '../../components/common';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Earnings = () => {
  const chartData = [
    { day: 'Mon', amount: 450 },
    { day: 'Tue', amount: 800 },
    { day: 'Wed', amount: 300 },
    { day: 'Thu', amount: 0 },
    { day: 'Fri', amount: 1200 },
    { day: 'Sat', amount: 950 },
    { day: 'Sun', amount: 500 },
  ];

  const transactions = [
    { id: 1, date: '03 Sep', customer: 'Vikas Sharma', service: 'House Wiring', amount: 600, status: 'Credit' },
    { id: 2, date: '02 Sep', customer: 'Rahul K.', service: 'Switchboard', amount: 300, status: 'Credit' },
    { id: 3, date: '01 Sep', customer: 'Platform', service: 'Platform Fee (8%)', amount: -72, status: 'Debit' },
    { id: 4, date: '01 Sep', customer: 'Cooperative', service: 'Welfare Fund (2%)', amount: -18, status: 'Debit' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <main className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">My Earnings</h1>

        {/* Total Balance */}
        <Card className="p-6 mb-6 bg-green-700 text-white text-center">
          <p className="text-green-200 mb-1">Available Balance</p>
          <h2 className="text-4xl font-bold mb-4">₹4,200</h2>
          <Button 
            className="w-full bg-white text-green-700 hover:bg-gray-10 font-bold"
            onClick={() => alert('Feature coming soon in production')}
          >
            Withdraw to Bank
          </Button>
        </Card>

        {/* Chart */}
        <Card className="p-4 mb-6">
          <h3 className="font-bold mb-4">Last 7 Days (₹4,200)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-gray-500 text-xs mb-1">Platform Commission</div>
            <div className="font-bold text-red-500">₹336 (8%)</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-gray-500 text-xs mb-1">Welfare Fund</div>
            <div className="font-bold text-orange-500">₹84 (2%)</div>
          </Card>
        </div>

        {/* Welfare Section */}
        <Card className="p-4 mb-6 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🤝</span>
            <h3 className="font-bold text-orange-800">Your Welfare Balance</h3>
          </div>
          <div className="text-2xl font-bold text-orange-600 mb-2">₹1,250</div>
          <p className="text-xs text-orange-700 mb-4">2% from every booking goes to your cooperative's welfare fund.</p>
          
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase">Proposed Benefits</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded border flex flex-col items-center text-center text-gray-500 opacity-70">
                <span>🏥</span>
                <span>Health Insurance</span>
              </div>
              <div className="bg-white p-2 rounded border flex flex-col items-center text-center text-gray-500 opacity-70">
                <span>🎓</span>
                <span>Skill Training</span>
              </div>
            </div>
            <div className="text-[10px] text-center text-gray-400 mt-1">Benefits coming soon via cooperative dashboard</div>
          </div>
        </Card>

        {/* Transactions */}
        <div>
          <h3 className="font-bold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map(t => (
              <Card key={t.id} className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm">{t.service}</div>
                    <div className="text-xs text-gray-500">{t.date} • {t.customer}</div>
                  </div>
                  <div className={`font-bold ${t.status === 'Credit' ? 'text-green-600' : 'text-red-500'}`}>
                    {t.status === 'Credit' ? '+' : ''}{t.amount}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <BottomNav role="worker" />
    </div>
  );
};

export default Earnings;
