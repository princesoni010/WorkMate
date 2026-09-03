import React, { useState } from 'react';
import { Sidebar } from '../../components/layout';
import { Card, Button } from '../../components/common';

const Grievances = () => {
  const [activeTab, setActiveTab] = useState('Open');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    { id: 'TKT-101', raisedBy: 'Vikas Sharma (Customer)', type: 'Payment Issue', booking: 'WM-10012', date: '2026-09-02', status: 'open', admin: 'Unassigned' },
    { id: 'TKT-102', raisedBy: 'Ramesh K. (Worker)', type: 'Customer Behavior', booking: 'WM-09988', date: '2026-09-01', status: 'in_review', admin: 'Admin 1' },
    { id: 'TKT-103', raisedBy: 'Coop Admin', type: 'System Error', booking: '-', date: '2026-08-30', status: 'resolved', admin: 'Admin 2' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Grievance Management</h1>
          <div className="flex gap-3">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">7 Open</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">12 In Review</span>
          </div>
        </div>

        <div className="flex border-b mb-6">
          {['Open', 'In Review', 'Resolved', 'All'].map(tab => (
            <button 
              key={tab}
              className={`px-6 py-3 font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <Card className="overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600">
                <th className="p-4">Ticket ID</th>
                <th className="p-4">Raised By</th>
                <th className="p-4">Type</th>
                <th className="p-4">Booking</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tickets.filter(t => activeTab === 'All' ? true : t.status.replace('_', ' ').toLowerCase() === activeTab.toLowerCase()).map(t => (
                <tr key={t.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => setSelectedTicket(t)}>
                  <td className="p-4 font-semibold">{t.id}</td>
                  <td className="p-4">{t.raisedBy}</td>
                  <td className="p-4">{t.type}</td>
                  <td className="p-4 text-blue-600">{t.booking}</td>
                  <td className="p-4">{t.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${t.status === 'open' ? 'bg-red-100 text-red-800' : t.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{t.admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>

      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
          <Card className="w-full max-w-md h-full rounded-none flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold">{selectedTicket.id}</h2>
                <p className="text-sm text-gray-500">{selectedTicket.type}</p>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-2xl text-gray-500">&times;</button>
            </div>
            
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div>
                <h3 className="font-semibold text-gray-700">Description</h3>
                <p className="text-sm text-gray-600 mt-2 bg-gray-100 p-3 rounded">
                  The payment was deducted from my account but the booking status still shows pending. Please resolve this urgently.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Evidence</h3>
                <div className="mt-2 text-sm text-blue-600 cursor-pointer flex items-center gap-2">
                  <span>📎</span> screenshot_payment.jpg
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Resolution Notes</h3>
                <textarea className="w-full p-2 border rounded text-sm h-24" placeholder="Enter notes..."></textarea>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Update Status</h3>
                <select className="w-full p-2 border rounded">
                  <option>In Review</option>
                  <option>Resolved</option>
                  <option>Escalated</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 space-y-2">
              <Button className="w-full bg-blue-900 text-white" onClick={() => {alert('Updated'); setSelectedTicket(null)}}>
                Save Updates
              </Button>
              {selectedTicket.admin === 'Unassigned' && (
                <Button variant="outline" className="w-full text-blue-600 border-blue-600">
                  Take Ownership
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Grievances;
