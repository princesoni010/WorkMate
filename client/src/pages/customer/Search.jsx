import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '../../components/common';
import { useLocationState } from '../../context/LocationContext';

const ALL_DEMO_WORKERS = [
  { id: 'w1', name: 'Ramesh Kumar', skill: 'Electrician', rating: 4.8, experience: 5, distance: '1.2 km', coop: 'Ranchi Shramik Sahakari Samiti', district: 'Ranchi', rcsNo: 'RCS/JHR/2023/LCS-402', verified: true, matchReasons: ['Highest Rated', 'Nearest (1.2 km)', '90% Fair Share'] },
  { id: 'w2', name: 'Sunita Devi', skill: 'Domestic Helper', rating: 4.6, experience: 4, distance: '2.1 km', coop: 'Mahila Shramik Swavalambi Samiti', district: 'Ranchi', rcsNo: 'RCS/JHR/2022/WCS-108', verified: true, matchReasons: ['Available Today', 'Skill Verified'] },
  { id: 'w3', name: 'Amit Sharma', skill: 'Electrician', rating: 4.5, experience: 4, distance: '2.4 km', coop: 'Ranchi Shramik Sahakari Samiti', district: 'Ranchi', rcsNo: 'RCS/JHR/2023/LCS-402', verified: true, matchReasons: ['ITI Certified'] },
  { id: 'w4', name: 'Sunil Mahato', skill: 'Carpenter', rating: 4.4, experience: 5, distance: '2.8 km', coop: 'Ranchi Shramik Sahakari Samiti', district: 'Ranchi', rcsNo: 'RCS/JHR/2023/LCS-402', verified: true, matchReasons: ['Experienced Craftsman'] },
  { id: 'w5', name: 'Deepak Paswan', skill: 'Plumber', rating: 4.3, experience: 4, distance: '3.1 km', coop: 'Jharkhand Plumbers Union', district: 'Ranchi', rcsNo: 'RCS/JHR/2021/LCS-119', verified: true, matchReasons: ['Leakage Specialist'] },
  { id: 'w6', name: 'Ravi Kumar', skill: 'Painter', rating: 4.6, experience: 6, distance: '3.5 km', coop: 'Jharkhand Nirman Union', district: 'Ranchi', rcsNo: 'RCS/JHR/2024/LCS-891', verified: true, matchReasons: ['Wall & Primer Expert'] },
];

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const { location, detecting, autoDetectLocation, resetToRanchi } = useLocationState();

  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedRating, setSelectedRating] = useState('any');
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // If user's global location is outside Ranchi (e.g. Raipur), return 0 workers for that area
      if (location.isOutsideRanchi) {
        setWorkers([]);
      } else {
        let list = [...ALL_DEMO_WORKERS];
        if (selectedService) {
          list = list.filter(w => w.skill.toLowerCase().includes(selectedService.toLowerCase()));
        }
        if (selectedRating !== 'any') {
          list = list.filter(w => w.rating >= Number(selectedRating));
        }
        setWorkers(list);
      }
      setLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [selectedService, selectedRating, location]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Search Header & Location Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Find Verified Cooperative Workers</h1>
          <p className="text-xs text-gray-500">Connecting you with government-registered cooperative tradespeople</p>
        </div>

        <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
          <span className="text-sm">📍</span>
          <span className="text-xs font-bold text-blue-900">{location.name}</span>
          <button
            onClick={() => autoDetectLocation()}
            disabled={detecting}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-white px-2 py-0.5 rounded shadow-xs border border-blue-200"
          >
            {detecting ? '...' : '🎯 Auto-Pick'}
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">Service Category</label>
          <select 
            value={selectedService} 
            onChange={(e) => setSelectedService(e.target.value)}
            className="input-field py-2 text-xs"
          >
            <option value="">All Services (All Trades)</option>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="carpenter">Carpenter</option>
            <option value="painter">Painter</option>
            <option value="domestic_helper">Domestic Helper</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">Minimum Rating</label>
          <select 
            value={selectedRating} 
            onChange={(e) => setSelectedRating(e.target.value)}
            className="input-field py-2 text-xs"
          >
            <option value="any">Any Rating (All Verified)</option>
            <option value="4.5">★ 4.5 & Above</option>
            <option value="4.0">★ 4.0 & Above</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={resetToRanchi}
            className={`w-full py-2.5 rounded-xl text-xs font-bold border transition ${
              !location.isOutsideRanchi 
                ? 'bg-green-50 text-green-800 border-green-200' 
                : 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100'
            }`}
          >
            {!location.isOutsideRanchi ? '✓ Serving Ranchi District' : '🔄 Switch to Active Ranchi Hub'}
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-sm text-gray-800">
          {workers.length} verified cooperative workers found {location.isOutsideRanchi ? `in ${location.name}` : 'nearby'}
        </h2>
        <span className="text-xs text-gray-400">90/8/2 Fair Share Protected</span>
      </div>

      {/* Results Grid / Custom Out-of-Area Empty State */}
      {loading ? (
        <div className="text-center py-16 text-gray-400 text-sm">Searching verified cooperative database...</div>
      ) : location.isOutsideRanchi || workers.length === 0 ? (
        <Card className="p-8 text-center border-dashed border-2 border-orange-200 bg-gradient-to-b from-orange-50/40 to-white rounded-3xl shadow-sm">
          <div className="text-5xl mb-3">📍</div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No Cooperative Workers Currently Available in {location.name}
          </h3>
          <p className="text-xs text-gray-600 max-w-md mx-auto mb-5 leading-relaxed">
            Our Labour Cooperative Societies are currently active and serving the <strong>Ranchi, Jharkhand</strong> pilot district. Cooperative federations in <strong>{location.city}</strong> are currently completing Registrar of Cooperative Societies (RCS) onboarding.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <Button 
              variant="primary" 
              className="bg-[#FF9933] hover:bg-orange-600 text-white text-xs font-bold py-2.5 px-4"
              onClick={resetToRanchi}
            >
              🔄 Switch to Ranchi Active District (Demo)
            </Button>
            
            {requestSubmitted ? (
              <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-4 py-2.5 rounded-xl">
                ✓ Notified {location.city} Cooperative Federation!
              </span>
            ) : (
              <Button 
                variant="outline" 
                className="text-xs font-bold text-blue-700 border-blue-200 hover:bg-blue-50 py-2.5 px-4"
                onClick={() => setRequestSubmitted(true)}
              >
                📢 Request Coverage for {location.city}
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workers.map((worker) => (
            <Card key={worker.id} className="p-5 hover:shadow-md transition border border-gray-200 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 font-black text-lg flex items-center justify-center border border-orange-200">
                      {worker.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900 flex items-center gap-1.5">
                        {worker.name}
                        <span className="text-blue-600 text-xs" title="Verified Cooperative Member">✓</span>
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">{worker.skill} • {worker.experience} yrs experience</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-lg">
                    ★ {worker.rating}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 mb-3">
                  <p className="flex justify-between">
                    <span>📍 Distance:</span>
                    <strong className="text-blue-700">{worker.distance} away</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>🏛️ Cooperative:</span>
                    <strong className="text-gray-800">{worker.coop}</strong>
                  </p>
                  <p className="flex justify-between text-[11px] text-gray-500">
                    <span>RCS Reg No:</span>
                    <span className="font-mono text-purple-700 font-bold">{worker.rcsNo}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {worker.matchReasons.map((reason) => (
                    <span key={reason} className="bg-green-50 text-green-800 border border-green-200 px-2 py-0.5 rounded text-[10px] font-medium">
                      ✓ {reason}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  className="flex-1 text-xs py-2 font-bold" 
                  onClick={() => navigate(`/customer/worker/${worker.id}`)}
                >
                  View Profile
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1 bg-[#FF9933] hover:bg-orange-600 text-white text-xs font-bold py-2" 
                  onClick={() => navigate(`/customer/book/${worker.id}`)}
                >
                  Book Service
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
