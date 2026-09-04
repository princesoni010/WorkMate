import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout';
import { Card, Button, Input } from '../../components/common';

const COOPERATIVE_SOCIETIES = [
  { id: 'ranchi_elec', name: 'Ranchi Shramik Sahakari Samiti', rcsNo: 'RCS/JHR/2023/LCS-402', district: 'Ranchi' },
  { id: 'jharkhand_plumbers', name: 'Jharkhand Plumbers & Tech Union', rcsNo: 'RCS/JHR/2021/LCS-119', district: 'Ranchi' },
  { id: 'mahila_samiti', name: 'Mahila Shramik Swavalambi Samiti', rcsNo: 'RCS/JHR/2022/WCS-108', district: 'Ranchi' },
  { id: 'nirman_union', name: 'Jharkhand Nirman Shramik Union', rcsNo: 'RCS/JHR/2024/LCS-891', district: 'Khunti' }
];

const WorkerRegister = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const progress = Math.round((step / totalSteps) * 100);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({
    passbook: false,
    eShram: false,
    skillCert: false
  });

  const [formData, setFormData] = useState({
    name: 'Ramesh Kumar',
    phone: '9876543211',
    cooperative: 'ranchi_elec',
    memberId: 'MEM-88219',
    rcsRegNo: 'RCS/JHR/2023/LCS-402',
    skills: ['Electrician'],
    experience: 5,
    district: 'Ranchi',
    address: 'Harmu Housing Colony, Ranchi',
    radius: 12,
    availableNow: true
  });

  const nextStep = () => setStep(Math.min(step + 1, totalSteps));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleDocUpload = (docKey) => {
    // Open native file picker
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf';
    input.onchange = (e) => {
      if (e.target.files?.[0]) {
        setUploadedDocs(prev => ({ ...prev, [docKey]: e.target.files[0].name }));
      }
    };
    input.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      nextStep();
    } else {
      alert(`✓ Application submitted for statutory verification under ${formData.rcsRegNo}! Cooperative Admin will verify with Registrar records.`);
      navigate('/worker/home');
    }
  };

  const selectedCoop = COOPERATIVE_SOCIETIES.find(c => c.id === formData.cooperative) || COOPERATIVE_SOCIETIES[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Ministry of Cooperation • Statutory Onboarding
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Labour Cooperative Member Registration</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Join verified State Government registered Labour Cooperative Societies under RCS Act.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#FF9933] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-right text-xs font-bold text-orange-600 mt-1">Step {step} of {totalSteps} ({progress}%)</p>
        </div>

        <Card className="p-6 md:p-8 shadow-md border border-gray-200 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Personal Details & Photo Upload */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2">1. Personal & Identity Details</h2>
                
                {/* Hidden File Input for Gallery / Camera */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                  className="hidden" 
                />

                <div className="flex flex-col items-center justify-center mb-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50/70 hover:bg-blue-100 flex flex-col items-center justify-center cursor-pointer transition overflow-hidden group relative shadow-xs"
                    title="Click to select photo from gallery or camera"
                  >
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <span className="text-3xl group-hover:scale-110 transition-transform">📸</span>
                        <span className="text-[11px] font-bold text-blue-800 mt-1">Add Photo</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-black/40 text-white text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      Change Photo
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1.5 cursor-pointer text-blue-600 hover:underline" onClick={() => fileInputRef.current?.click()}>
                    Click to open Camera / Gallery
                  </span>
                </div>

                <Input label="Full Name (as per Aadhaar / e-Shram)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                <Input label="Active Mobile Number (for gig dispatch alerts)" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              </div>
            )}

            {/* Step 2: Labour Cooperative Society Affiliation & RCS Registration */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2">2. Labour Cooperative Society Affiliation</h2>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Select Registered Labour Cooperative Society
                  </label>
                  <select 
                    className="input-field" 
                    value={formData.cooperative} 
                    onChange={e => {
                      const found = COOPERATIVE_SOCIETIES.find(c => c.id === e.target.value);
                      setFormData({
                        ...formData, 
                        cooperative: e.target.value,
                        rcsRegNo: found ? found.rcsNo : ''
                      });
                    }}
                  >
                    {COOPERATIVE_SOCIETIES.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} — ({c.rcsNo})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-purple-900">
                    <span>🏛️ State RCS Registration Number:</span>
                    <span className="font-mono">{selectedCoop.rcsNo}</span>
                  </div>
                  <p className="text-[11px] text-purple-800">
                    Registered under State Cooperative Societies Act (Registrar of Cooperative Societies, State Govt).
                  </p>
                </div>

                <Input 
                  label="Primary Cooperative Membership Passbook / Card No." 
                  placeholder="e.g., MEM-88219" 
                  value={formData.memberId} 
                  onChange={e => setFormData({...formData, memberId: e.target.value})} 
                  required 
                />
              </div>
            )}

            {/* Step 3: Trade & Skill */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2">3. Trade Skill & Experience</h2>
                <p className="text-xs text-gray-600">Select your certified primary trade:</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason', 'Domestic Helper'].map(skill => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => setFormData({...formData, skills: [skill]})}
                      className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        formData.skills.includes(skill)
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span>{skill}</span>
                      {formData.skills.includes(skill) && <span>✓</span>}
                    </button>
                  ))}
                </div>
                <Input 
                  label="Years of Practical Trade Experience" 
                  type="number" 
                  value={formData.experience} 
                  onChange={e => setFormData({...formData, experience: e.target.value})} 
                  required 
                />
              </div>
            )}

            {/* Step 4: Service Area */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2">4. Service Area & Mobility</h2>
                <Input label="District" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} required />
                <Input label="Base Address / Locality" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Service Dispatch Radius: {formData.radius} km</label>
                  <input 
                    type="range" 
                    min="2" 
                    max="25" 
                    value={formData.radius} 
                    onChange={e => setFormData({...formData, radius: e.target.value})} 
                    className="w-full accent-[#FF9933]" 
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>2 km (Local Ward)</span>
                    <span>12 km (Standard City Radius)</span>
                    <span>25 km (District Max)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Availability */}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2">5. On-Call Availability</h2>
                <label className="flex items-center gap-3 p-3.5 bg-green-50 border border-green-200 rounded-xl cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.availableNow} 
                    onChange={e => setFormData({...formData, availableNow: e.target.checked})} 
                    className="w-5 h-5 accent-green-600 rounded" 
                  />
                  <div>
                    <span className="font-bold text-green-900 block text-xs">Ready for On-Call Gig Dispatch (Online)</span>
                    <span className="text-[11px] text-green-700">You will receive live booking notifications within your {formData.radius} km service radius.</span>
                  </div>
                </label>
              </div>
            )}

            {/* Step 6: Statutory Document Verification */}
            {step === 6 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2">6. Statutory Document Uploads</h2>
                
                {/* 1. RCS Society Registration Certificate */}
                <div className="border border-dashed border-purple-300 p-3.5 rounded-xl bg-purple-50/50 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">📜</span>
                    <div>
                      <p className="font-bold text-xs text-purple-950">Registration Certificate from Registrar of Cooperative Societies (RCS)</p>
                      <p className="text-[10px] text-purple-700">State Govt Authority • Reg: {formData.rcsRegNo}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-purple-200 text-purple-900 font-bold px-2.5 py-1 rounded-lg">
                    ✓ Pre-Verified
                  </span>
                </div>

                {/* 2. Primary Cooperative Membership Passbook */}
                <div className="border border-dashed border-gray-300 p-3.5 rounded-xl bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">📖</span>
                    <div>
                      <p className="font-bold text-xs text-gray-900">Cooperative Membership Passbook / Share Certificate</p>
                      <p className="text-[10px] text-gray-500">
                        {uploadedDocs.passbook ? `✓ ${uploadedDocs.passbook}` : `Member ID: ${formData.memberId}`}
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleDocUpload('passbook')}
                    className="text-xs bg-white border border-gray-300 hover:bg-gray-100 font-bold px-3 py-1.5 rounded-lg shadow-xs"
                  >
                    {uploadedDocs.passbook ? 'Change File' : 'Upload from Gallery'}
                  </button>
                </div>

                {/* 3. e-Shram Card */}
                <div className="border border-dashed border-gray-300 p-3.5 rounded-xl bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">🪪</span>
                    <div>
                      <p className="font-bold text-xs text-gray-900">e-Shram National Worker Card (UAN) / Aadhaar</p>
                      <p className="text-[10px] text-gray-500">
                        {uploadedDocs.eShram ? `✓ ${uploadedDocs.eShram}` : 'Ministry of Labour & Employment'}
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleDocUpload('eShram')}
                    className="text-xs bg-white border border-gray-300 hover:bg-gray-100 font-bold px-3 py-1.5 rounded-lg shadow-xs"
                  >
                    {uploadedDocs.eShram ? 'Change File' : 'Upload from Gallery'}
                  </button>
                </div>

                {/* 4. ITI Certificate */}
                <div className="border border-dashed border-gray-300 p-3.5 rounded-xl bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">🎓</span>
                    <div>
                      <p className="font-bold text-xs text-gray-900">ITI / NCVT Trade Skill Certificate</p>
                      <p className="text-[10px] text-gray-500">
                        {uploadedDocs.skillCert ? `✓ ${uploadedDocs.skillCert}` : `Trade: ${formData.skills[0] || 'Electrician'}`}
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleDocUpload('skillCert')}
                    className="text-xs bg-white border border-gray-300 hover:bg-gray-100 font-bold px-3 py-1.5 rounded-lg shadow-xs"
                  >
                    {uploadedDocs.skillCert ? 'Change File' : 'Upload from Gallery'}
                  </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 p-3 rounded-xl text-[11px] leading-relaxed">
                  <strong>Statutory Notice:</strong> All submissions are cross-verified by the Cooperative Society Admin against the State Registrar of Cooperative Societies gazette roll before workers can receive live work orders.
                </div>
              </div>
            )}

            {/* Form Action Controls */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {step > 1 && (
                <Button type="button" variant="outline" className="flex-1 py-3 text-xs" onClick={prevStep}>
                  Back
                </Button>
              )}
              <Button 
                type="submit" 
                variant="primary" 
                className={`flex-1 py-3 text-xs font-bold text-white ${
                  step === totalSteps ? 'bg-green-600 hover:bg-green-700' : 'bg-[#FF9933] hover:bg-orange-600'
                }`}
              >
                {step === totalSteps ? 'Submit for Statutory Verification' : 'Continue to Next Step'}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default WorkerRegister;
