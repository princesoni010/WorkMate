import React from 'react';
import { Card, Button } from '../../components/common';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAuth from '../../hooks/useAuth';

const Earnings = () => {
  const { user } = useAuth();
  const isDemoWorker = user?.email === 'worker.demo@workmate.test';

  const chartData = isDemoWorker ? [
    { day: 'Mon', amount: 450 },
    { day: 'Tue', amount: 800 },
    { day: 'Wed', amount: 300 },
    { day: 'Thu', amount: 0 },
    { day: 'Fri', amount: 1200 },
    { day: 'Sat', amount: 950 },
    { day: 'Sun', amount: 500 },
  ] : [
    { day: 'Mon', amount: 0 },
    { day: 'Tue', amount: 0 },
    { day: 'Wed', amount: 0 },
    { day: 'Thu', amount: 0 },
    { day: 'Fri', amount: 0 },
    { day: 'Sat', amount: 0 },
    { day: 'Sun', amount: 0 },
  ];

  const transactions = isDemoWorker ? [
    { id: 1, date: '03 Sep', customer: 'Vikas Sharma', service: 'House Wiring', amount: 600, status: 'Credit' },
    { id: 2, date: '02 Sep', customer: 'Rahul K.', service: 'Switchboard', amount: 300, status: 'Credit' },
    { id: 3, date: '01 Sep', customer: 'Platform', service: 'Platform Fee (8%)', amount: -72, status: 'Debit' },
    { id: 4, date: '01 Sep', customer: 'Cooperative', service: 'Welfare Fund (2%)', amount: -18, status: 'Debit' },
  ] : [];

  const balance = isDemoWorker ? 4200 : 0;
  const directWages = isDemoWorker ? 3780 : 0;
  const welfareCredit = isDemoWorker ? 84 : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Earnings & Payouts</h1>
        <p className="text-xs text-gray-500">Transparent 90% direct earnings + 2% cooperative welfare ledger</p>
      </div>

      {/* Total Balance Card */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-[#138808] to-emerald-700 text-white text-center rounded-2xl shadow-md">
        <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-1">Available Withdrawable Balance</p>
        <h2 className="text-4xl font-black mb-4">₹{balance.toLocaleString()}</h2>
        <Button 
          className="w-full bg-white text-green-800 hover:bg-emerald-50 font-bold py-2.5 text-xs shadow-sm"
          onClick={() => alert('Direct UPI / Bank Transfer withdrawal initiated to linked Cooperative Jan Dhan account.')}
          disabled={balance === 0}
        >
          {balance > 0 ? 'Withdraw to Linked Bank Account (Instant UPI)' : 'No Balance to Withdraw'}
        </Button>
      </Card>

      {/* Chart */}
      {isDemoWorker && (
        <Card className="p-5 mb-6 border border-gray-200 bg-white">
          <h3 className="font-bold text-sm text-gray-800 mb-3">Last 7 Days Earnings Trend (₹{balance})</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="amount" fill="#138808" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Breakdown Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 text-center border border-gray-200 bg-white">
          <span className="text-[11px] font-bold text-gray-400 uppercase">90% Direct Share</span>
          <div className="text-xl font-bold text-gray-800 mt-1">₹{directWages}</div>
          <span className="text-[10px] text-green-600">Zero Commission Cut</span>
        </Card>

        <Card className="p-4 text-center border border-gray-200 bg-white">
          <span className="text-[11px] font-bold text-gray-400 uppercase">2% Welfare Ledger</span>
          <div className="text-xl font-bold text-orange-600 mt-1">₹{welfareCredit}</div>
          <span className="text-[10px] text-gray-400">Social Security Fund</span>
        </Card>
      </div>

      {/* Transactions List */}
      <Card className="p-5 border border-gray-200 bg-white">
        <h3 className="font-bold text-sm text-gray-800 mb-3">Recent Payout Transactions</h3>
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-xs">
                <div>
                  <p className="font-bold text-gray-800">{t.service}</p>
                  <p className="text-[10px] text-gray-400">{t.date} • {t.customer}</p>
                </div>
                <div className={`font-black ${t.amount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {t.amount > 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-gray-400">
            No earnings or transactions recorded yet. Complete your first gig to receive your direct payout!
          </div>
        )}
      </Card>
    </div>
  );
};

export default Earnings;
