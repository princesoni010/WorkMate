import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout';
import { Card, Button, Input } from '../../components/common';

const WorkerRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const progress = Math.round((step / totalSteps) * 100);

  const [formData, setFormData] = useState({
    name: 'Worker User', // pre-filled
    phone: '',
    cooperative: '',
    skills: [],
    district: '',
    address: '',
    radius: 10,
    availableNow: true
  });

  const nextStep = () => setStep(Math.min(step + 1, totalSteps));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      nextStep();
    } else {
      alert('Profile submitted for verification!');
      navigate('/worker/home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Setup Your Profile</h1>
        
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">{progress}% complete</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Personal Details</h2>
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200">
                    <span className="text-2xl">📷</span>
                    <span className="text-xs text-gray-500 mt-1">Upload Photo</span>
                  </div>
                </div>
                <Input label="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <Input label="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Cooperative Affiliation</h2>
                <div>
                  <label className="block text-sm font-medium mb-1">Select Cooperative Society</label>
                  <select className="w-full p-3 border rounded-lg" value={formData.cooperative} onChange={e => setFormData({...formData, cooperative: e.target.value})}>
                    <option value="">-- Select --</option>
                    <option value="ranchi_elec">Ranchi Electricians Coop</option>
                    <option value="jharkhand_plumbers">Jharkhand Plumbers Union</option>
                    <option value="mahila_samiti">Mahila Shramik Samiti</option>
                  </select>
                </div>
                <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  Joining a cooperative provides welfare benefits and collective bargaining power.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">3. Skills & Experience</h2>
                <p className="text-sm text-gray-600">Select your skills (multi-select demo)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason'].map(skill => (
                    <span key={skill} className="px-3 py-1 border rounded-full text-sm cursor-pointer hover:bg-blue-50">
                      {skill}
                    </span>
                  ))}
                </div>
                <Input label="Years of Experience" type="number" />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">4. Service Area</h2>
                <Input label="District" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} />
                <Input label="Base Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                <div>
                  <label className="block text-sm font-medium mb-1">Service Radius: {formData.radius} km</label>
                  <input type="range" min="1" max="25" value={formData.radius} onChange={e => setFormData({...formData, radius: e.target.value})} className="w-full accent-blue-600" />
                </div>
                <div className="h-32 bg-gray-200 flex items-center justify-center border text-sm text-gray-500">[Map Preview]</div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">5. Availability</h2>
                <label className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <input type="checkbox" checked={formData.availableNow} onChange={e => setFormData({...formData, availableNow: e.target.checked})} className="w-5 h-5 accent-green-600" />
                  <span className="font-semibold text-green-800">Available Now</span>
                </label>
                <p className="text-sm mt-4">Weekly Schedule (Demo Grid)</p>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['M','T','W','T','F','S','S'].map((d,i) => <div key={i} className="font-bold">{d}</div>)}
                  {Array(7).fill(0).map((_,i) => <div key={`m${i}`} className="bg-blue-100 p-1 rounded">AM</div>)}
                  {Array(7).fill(0).map((_,i) => <div key={`p${i}`} className="bg-blue-100 p-1 rounded">PM</div>)}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">6. Documents Verification</h2>
                
                <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center bg-gray-50">
                  <p className="font-semibold">e-Shram ID / Aadhaar</p>
                  <p className="text-xs text-orange-500 mb-2">(Demo - no real data)</p>
                  <Button type="button" variant="outline" size="small">Upload Document</Button>
                </div>
                
                <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center bg-gray-50">
                  <p className="font-semibold">Skill Certificate</p>
                  <Button type="button" variant="outline" size="small" className="mt-2">Upload Document</Button>
                </div>

                <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm mt-4">
                  Note: Your profile will be reviewed by the cooperative admin before you can accept jobs.
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4 mt-6 border-t">
              {step > 1 && (
                <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>Back</Button>
              )}
              <Button type="submit" variant="primary" className={`flex-1 ${step === totalSteps ? 'bg-green-600' : 'bg-blue-900'} text-white`}>
                {step === totalSteps ? 'Submit for Verification' : 'Next'}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default WorkerRegister;
