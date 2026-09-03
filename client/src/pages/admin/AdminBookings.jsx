import React, { useState } from 'react';
import { Sidebar } from '../../components/layout';
import { Card, Button, StatusBadge } from '../../components/common';

const AdminBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookings = [
    { id: 'WM-10023', customer: 'Vikas S.', worker: 'Ramesh K.', service: 'Electrician', date: '2026-09-03', status: 'completed', amount: 450 },
    { id: 'WM-10024', customer: 'Amit P.', worker: 'Pending', service: 'Plumber', date: '2026-09-04', status: 'pending', amount: null },
    { id: 'WM-10025', customer: 'Neha G.', worker: 'Anil O.', service: 'Mason', date: '2026-09-01', status: 'cancelled', amount: null }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
          <Button variant="outline" className="bg-white" onClick={() => alert('Exporting data...')}>
            📥 Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6 flex flex-wrap gap-4 items-center">
          <input type="text" placeholder="Search Booking ID..." className="p-2 border rounded min-w-[200px]" />
          <select className="p-2 border rounded"><option>All Statuses</option></select>
          <select className="p-2 border rounded"><option>All Services</option></select>
          <select className="p-2 border rounded"><option>All Districts</option></select>
          <input type="date" className="p-2 border rounded" />
        </Card>

        {/* Status Counts */}
        <div className="flex gap-4 mb-6">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border-l-4 border-gray-400">Total: 8,432</div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border-l-4 border-yellow-400">Pending: 42</div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border-l-4 border-blue-400">Active: 156</div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border-l-4 border-green-400">Completed: 8,120</div>
        </div>

        {/* Data Table */}
        <Card className="overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600">
                <th className="p-4 font-medium">Booking Code</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Worker</th>
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => setSelectedBooking(b)}>
                  <td className="p-4 font-semibold text-blue-600">{b.id}</td>
                  <td className="p-4">{b.customer}</td>
                  <td className="p-4">{b.worker}</td>
                  <td className="p-4">{b.service}</td>
                  <td className="p-4">{b.date}</td>
                  <td className="p-4">{b.amount ? `₹${b.amount}` : '-'}</td>
                  <td className="p-4"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>

      {/* Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">{selectedBooking.id} Details</h2>
              <button onClick={() => setSelectedBooking(null)} className="text-2xl text-gray-500">&times;</button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-500 mb-2">Customer Info</h3>
                  <p className="font-bold">{selectedBooking.customer}</p>
                  <p className="text-sm">Location: Sector 4, Ranchi</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500 mb-2">Worker Info</h3>
                  {selectedBooking.worker === 'Pending' ? (
                    <Button variant="outline" size="small" className="text-blue-600 border-blue-600">Manual Assign Worker</Button>
                  ) : (
                    <>
                      <p className="font-bold">{selectedBooking.worker}</p>
                      <p className="text-sm">Coop: Ranchi Electricians</p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-500 mb-3">Timeline</h3>
                <div className="space-y-3 border-l-2 border-gray-200 ml-2 pl-4 text-sm">
                  <div>
                    <p className="font-bold">Booking Created</p>
                    <p className="text-gray-500 text-xs">03 Sep 2026, 09:00 AM</p>
                  </div>
                  {selectedBooking.status !== 'pending' && (
                    <div>
                      <p className="font-bold text-blue-600">System Matched Worker</p>
                      <p className="text-gray-500 text-xs">Reason: Highest Rated, Nearest</p>
                    </div>
                  )}
                  {selectedBooking.status === 'completed' && (
                    <div>
                      <p className="font-bold text-green-600">Service Completed & Paid</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedBooking.amount && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-500 mb-2">Payment Allocation</h3>
                  <div className="flex justify-between text-sm"><span>Worker (90%):</span> <span>₹{selectedBooking.amount * 0.9}</span></div>
                  <div className="flex justify-between text-sm"><span>Platform (8%):</span> <span>₹{selectedBooking.amount * 0.08}</span></div>
                  <div className="flex justify-between text-sm text-orange-600 font-medium"><span>Welfare (2%):</span> <span>₹{selectedBooking.amount * 0.02}</span></div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
