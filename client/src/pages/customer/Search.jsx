import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, BottomNav } from '../../components/layout';
import { Button, Card } from '../../components/common';
// import { workerService } from '../../services';

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    // Mock fetch workers
    setLoading(true);
    setTimeout(() => {
      setWorkers([
        { id: 1, name: 'Ramesh Kumar', skill: 'Electrician', rating: 4.8, experience: 5, distance: '1.2 km', coop: 'Ranchi Electricians Coop', verified: true, matchReasons: ['Highest Rated', 'Nearest'] },
        { id: 2, name: 'Sunita Devi', skill: 'Electrician', rating: 4.5, experience: 3, distance: '2.5 km', coop: 'Jharkhand Mahila Samiti', verified: true, matchReasons: ['Available Today'] },
        { id: 3, name: 'Amit Singh', skill: 'Plumber', rating: 4.2, experience: 8, distance: '3.0 km', coop: 'Ranchi Plumbers Union', verified: true, matchReasons: ['Experienced'] },
      ].filter(w => initialService ? w.skill.toLowerCase() === initialService.toLowerCase() : true));
      setLoading(false);
    }, 500);
  }, [initialService]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <main className="px-4 py-4 max-w-6xl mx-auto">
        {/* Search/Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center">
          <select className="w-full md:w-auto p-2 border rounded" defaultValue={initialService}>
            <option value="">All Services</option>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="carpenter">Carpenter</option>
          </select>
          
          <select className="w-full md:w-auto p-2 border rounded">
            <option value="any">Any Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
          </select>
          
          <select className="w-full md:w-auto p-2 border rounded">
            <option value="10">Within 10 km</option>
            <option value="5">Within 5 km</option>
            <option value="2">Within 2 km</option>
          </select>
          
          <label className="flex items-center gap-2 w-full md:w-auto p-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>Available Today</span>
          </label>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">{workers.length} verified workers found</h2>
          <select className="p-1 border rounded text-sm bg-transparent">
            <option>Recommended</option>
            <option>Nearest</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-10">Loading workers...</div>
        ) : workers.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No workers found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workers.map(worker => (
              <Card key={worker.id} className="p-4 flex flex-col">
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-xl">
                    {worker.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-1">
                      {worker.name} {worker.verified && <span className="text-blue-500 text-sm">✓</span>}
                    </h3>
                    <p className="text-sm text-gray-600">{worker.skill} • {worker.experience} yrs exp</p>
                    <p className="text-sm text-orange-500">★ {worker.rating}</p>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-4 space-y-1 flex-grow">
                  <p>📍 {worker.distance} away</p>
                  <p>🤝 {worker.coop}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {worker.matchReasons.map(reason => (
                      <span key={reason} className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-[10px]">{reason}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Button variant="outline" className="flex-1 text-sm py-2" onClick={() => navigate(`/customer/worker/${worker.id}`)}>
                    View Profile
                  </Button>
                  <Button variant="primary" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm py-2" onClick={() => navigate(`/customer/book/${worker.id}`)}>
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <BottomNav role="customer" />
    </div>
  );
};

export default Search;
