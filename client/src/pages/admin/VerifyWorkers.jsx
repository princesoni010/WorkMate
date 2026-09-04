import React, { useState } from 'react';
import { Sidebar } from '../../components/layout';
import { Card, Button, StatusBadge } from '../../components/common';

const VerifyWorkers = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);

  const workers = [
    { 
      id: 1, 
      name: 'Suresh Das', 
      skill: 'Electrician (ITI Certified)', 
      coop: 'Ranchi Shramik Sahakari Samiti', 
      rcsRegNo: 'RCS/JHR/2023/LCS-402',
      memberId: 'MEM-88219',
      district: 'Ranchi', 
      status: 'pending',
      eShram: 'UAN 9840-2918-4421',
      experience: '5 Years',
      dateApplied: '03 Sep 2026'
    },
    { 
      id: 2, 
      name: 'Kamala Devi', 
      skill: 'Domestic Helper & Caregiver', 
      coop: 'Mahila Shramik Swavalambi Samiti', 
      rcsRegNo: 'RCS/JHR/2022/WCS-108',
      memberId: 'MEM-40912',
      district: 'Ranchi', 
      status: 'pending',
      eShram: 'UAN 7120-4491-3310',
      experience: '6 Years',
      dateApplied: '03 Sep 2026'
    },
    { 
      id: 3, 
      name: 'Anil Oraon', 
      skill: 'Mason & Construction Tech', 
      coop: 'Jharkhand Nirman Shramik Union', 
      rcsRegNo: 'RCS/JHR/2024/LCS-891',
      memberId: 'MEM-11048',
      district: 'Khunti', 
      status: 'pending',
      eShram: 'UAN 5519-8820-1194',
      experience: '4 Years',
      dateApplied: '02 Sep 2026'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Ministry Compliance & Statutory Verification</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">Labour Cooperative Society & Worker Verification</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Verify Registration Certificates issued by Registrar of Cooperative Societies (RCS / State Govt) & e-Shram credentials.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl text-xs font-bold text-orange-800">
              3 Pending Review
            </div>
            <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-xl text-xs font-bold text-green-800">
              1,245 Verified Members
            </div>
          </div>
        </div>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* Main List */}
          <Card className="flex-1 flex flex-col h-full shadow-sm border border-gray-200">
            <div className="p-4 border-b flex gap-3 bg-gray-50/50 rounded-t-xl text-xs">
              <input 
                type="text" 
                placeholder="Search by worker name, Society RCS Reg No, or Member ID..." 
                className="flex-1 p-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 text-xs" 
              />
              <select className="p-2.5 border border-gray-300 rounded-xl bg-white font-semibold">
                <option>All Skills / Trades</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Mason</option>
              </select>
              <select className="p-2.5 border border-gray-300 rounded-xl bg-white font-semibold">
                <option>Pending Verification</option>
                <option>Verified</option>
              </select>
            </div>
            
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 sticky top-0 border-b border-gray-200">
                  <tr className="text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-4">Worker Member</th>
                    <th className="p-4">Trade & Skill</th>
                    <th className="p-4">Labour Cooperative Society</th>
                    <th className="p-4">RCS State Reg No</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {workers.map((w) => (
                    <tr 
                      key={w.id} 
                      className={`hover:bg-blue-50/60 cursor-pointer transition ${
                        selectedWorker?.id === w.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                      }`} 
                      onClick={() => setSelectedWorker(w)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-blue-100 text-blue-800 rounded-xl font-bold flex items-center justify-center">
                            {w.name.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">{w.name}</span>
                            <span className="text-[11px] text-gray-400">ID: {w.memberId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-gray-800">{w.skill}</td>
                      <td className="p-4">
                        <span className="font-semibold text-blue-900 block">{w.coop}</span>
                        <span className="text-[10px] text-gray-400">District: {w.district}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                          {w.rcsRegNo}
                        </span>
                      </td>
                      <td className="p-4"><StatusBadge status={w.status} /></td>
                      <td className="p-4 text-right">
                        <button className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-100">
                          Inspect Docs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Detail Panel */}
          {selectedWorker ? (
            <Card className="w-[420px] flex flex-col h-full overflow-y-auto shadow-md border border-gray-200 bg-white">
              <div className="p-5 border-b text-center relative bg-gradient-to-b from-gray-50 to-white">
                <button 
                  onClick={() => setSelectedWorker(null)} 
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold absolute top-4 right-4 flex items-center justify-center"
                >
                  &times;
                </button>
                <div className="w-16 h-16 bg-blue-600 text-white text-xl font-black rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-sm">
                  {selectedWorker.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <h2 className="text-lg font-bold text-gray-900">{selectedWorker.name}</h2>
                <p className="text-xs text-blue-700 font-semibold">{selectedWorker.skill}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Applied on {selectedWorker.dateApplied}</p>
              </div>
              
              <div className="p-5 space-y-4 flex-1 text-xs">
                {/* Statutory Cooperative Verification Card */}
                <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-purple-900 uppercase text-[10px] tracking-wider">
                      🏛️ State Cooperative Registration (RCS)
                    </span>
                    <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 rounded font-bold">
                      Valid Act
                    </span>
                  </div>
                  <p className="font-bold text-gray-900">{selectedWorker.coop}</p>
                  <p className="text-gray-600">
                    RCS Reg Certificate No: <strong className="font-mono text-purple-950">{selectedWorker.rcsRegNo}</strong>
                  </p>
                  <p className="text-gray-600">
                    Primary Membership Passbook: <strong className="text-gray-900">{selectedWorker.memberId}</strong>
                  </p>
                </div>

                {/* Statutory Submitted Documents Checklist */}
                <div>
                  <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px] mb-2">
                    Submitted Statutory Documents
                  </h3>
                  <div className="space-y-2">
                    {/* 1. RCS Registration Certificate */}
                    <div className="flex justify-between items-center p-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-base">📜</span>
                        <div>
                          <p className="font-bold text-gray-800">RCS Society Registration Certificate</p>
                          <p className="text-[10px] text-gray-400">Registrar of Cooperative Societies (State Govt)</p>
                        </div>
                      </div>
                      <span className="text-blue-600 font-bold hover:underline cursor-pointer">Preview PDF</span>
                    </div>

                    {/* 2. e-Shram & Aadhaar */}
                    <div className="flex justify-between items-center p-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🪪</span>
                        <div>
                          <p className="font-bold text-gray-800">e-Shram National Worker Card</p>
                          <p className="text-[10px] text-gray-400">{selectedWorker.eShram}</p>
                        </div>
                      </div>
                      <span className="text-blue-600 font-bold hover:underline cursor-pointer">Preview</span>
                    </div>

                    {/* 3. ITI / Trade Skill Certificate */}
                    <div className="flex justify-between items-center p-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🎓</span>
                        <div>
                          <p className="font-bold text-gray-800">ITI / NCVT Trade Skill Certificate</p>
                          <p className="text-[10px] text-gray-400">Experience: {selectedWorker.experience}</p>
                        </div>
                      </div>
                      <span className="text-blue-600 font-bold hover:underline cursor-pointer">Preview</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[11px] mb-1.5">
                    Admin Verification Notes & Audit Log
                  </h3>
                  <textarea 
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-xs h-20 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter statutory inspection notes (e.g. Verified with RCS district gazette register)..."
                  ></textarea>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 shadow-sm text-xs" 
                  onClick={() => {
                    alert(`✓ Worker ${selectedWorker.name} verified and approved under Cooperative ${selectedWorker.coop} (${selectedWorker.rcsRegNo}). Added to live Matching Pool!`); 
                    setSelectedWorker(null);
                  }}
                >
                  ✓ Approve & Authorize Worker
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 text-yellow-700 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 text-xs py-2"
                    onClick={() => alert(`Correction notice sent to ${selectedWorker.name} for missing RCS annexure.`)}
                  >
                    Request Correction
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-700 border-red-300 bg-red-50 hover:bg-red-100 text-xs py-2"
                    onClick={() => alert(`Application for ${selectedWorker.name} rejected.`)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="w-[420px] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-2xl bg-white h-full p-6 text-center">
              <span className="text-4xl mb-3">🏛️</span>
              <p className="font-bold text-gray-700 text-sm">Select Worker for Statutory Verification</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Inspect State Govt RCS Registration Certificate, Primary Membership ID, and e-Shram credentials.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerifyWorkers;
