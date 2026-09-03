import React, { useState } from 'react';
import { Sidebar } from '../../components/layout';
import { Card, Button, StatusBadge } from '../../components/common';

const VerifyWorkers = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);

  const workers = [
    { id: 1, name: 'Suresh Das', skill: 'Electrician', coop: 'Ranchi Electricians', district: 'Ranchi', status: 'pending' },
    { id: 2, name: 'Kamala Devi', skill: 'Tailor', coop: 'Mahila Samiti', district: 'Ranchi', status: 'pending' },
    { id: 3, name: 'Anil Oraon', skill: 'Mason', coop: 'Jharkhand Nirman', district: 'Khunti', status: 'pending' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Verify Workers</h1>
          <div className="flex gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-semibold text-blue-800">
              24 Pending
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-semibold text-green-700">
              1,245 Verified
            </div>
          </div>
        </div>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* Main List */}
          <Card className="flex-1 flex flex-col h-full">
            <div className="p-4 border-b flex gap-4 bg-gray-50 rounded-t-xl">
              <input type="text" placeholder="Search by name or ID..." className="flex-1 p-2 border rounded" />
              <select className="p-2 border rounded bg-white">
                <option>All Skills</option>
                <option>Electrician</option>
              </select>
              <select className="p-2 border rounded bg-white">
                <option>Pending</option>
                <option>Verified</option>
              </select>
            </div>
            
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left">
                <thead className="bg-gray-50 sticky top-0">
                  <tr className="text-gray-600 text-sm">
                    <th className="p-4 font-medium">Worker</th>
                    <th className="p-4 font-medium">Skills</th>
                    <th className="p-4 font-medium">Cooperative</th>
                    <th className="p-4 font-medium">District</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {workers.map(w => (
                    <tr key={w.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => setSelectedWorker(w)}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <span className="font-semibold">{w.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{w.skill}</td>
                      <td className="p-4">{w.coop}</td>
                      <td className="p-4">{w.district}</td>
                      <td className="p-4"><StatusBadge status={w.status} /></td>
                      <td className="p-4">
                        <Button variant="outline" size="small">Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Detail Panel */}
          {selectedWorker ? (
            <Card className="w-96 flex flex-col h-full overflow-y-auto">
              <div className="p-6 border-b text-center relative">
                <button onClick={() => setSelectedWorker(null)} className="absolute top-4 right-4 text-gray-500">&times;</button>
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h2 className="text-xl font-bold">{selectedWorker.name}</h2>
                <p className="text-gray-500">{selectedWorker.coop}</p>
              </div>
              
              <div className="p-6 space-y-6 flex-1">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Submitted Documents</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 border rounded text-sm">
                      <div className="flex items-center gap-2">📄 <span>Aadhaar / e-Shram</span></div>
                      <span className="text-blue-600 cursor-pointer text-xs">View</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 border rounded text-sm">
                      <div className="flex items-center gap-2">📄 <span>Skill Certificate</span></div>
                      <span className="text-blue-600 cursor-pointer text-xs">View</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Verification Notes</h3>
                  <textarea className="w-full p-2 border rounded text-sm h-24" placeholder="Enter notes (mandatory for rejection)..."></textarea>
                </div>
              </div>
              
              <div className="p-4 border-t bg-gray-50 space-y-2">
                <Button className="w-full bg-green-600 text-white font-bold" onClick={() => {alert('Approved'); setSelectedWorker(null)}}>
                  Approve Worker
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                    Req. Correction
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="w-96 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 h-full">
              <span className="text-4xl mb-4">📋</span>
              <p>Select a worker to review</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerifyWorkers;
