import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '../../components/common';
import { Navbar } from '../../components/layout';

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    // Mock fetch worker
    setWorker({
      id,
      name: 'Ramesh Kumar',
      verified: true,
      coop: 'Ranchi Electricians Coop',
      experience: 5,
      jobsCompleted: 124,
      rating: 4.8,
      reviewsCount: 89,
      skills: ['Electrician', 'Wiring', 'Appliance Repair'],
      about: 'I have been working as an electrician for 5 years. I specialize in home wiring and repairing electrical appliances. Always committed to safe and high-quality work.',
      available: true,
      reviews: [
        { id: 1, customer: 'Anita Singh', stars: 5, comment: 'Very professional and quick service.', date: '2 days ago' },
        { id: 2, customer: 'Rajesh Verma', stars: 4, comment: 'Good work but arrived 10 mins late.', date: '1 week ago' }
      ]
    });
  }, [id]);

  if (!worker) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      
      <main className="max-w-2xl mx-auto bg-white min-h-screen shadow-sm">
        {/* Header Section */}
        <div className="p-4 border-b">
          <button onClick={() => navigate(-1)} className="text-gray-600 mb-4 flex items-center gap-2">
            <span>←</span> Back
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-4">
              {worker.name[0]}
            </div>
            <h1 className="text-2xl font-bold flex items-center gap-2 justify-center">
              {worker.name} {worker.verified && <span className="text-blue-500 text-lg">✓</span>}
            </h1>
            <p className="text-gray-600 mb-2">{worker.coop}</p>
            
            <div className="flex items-center gap-2 text-sm">
              <span className={`w-3 h-3 rounded-full ${worker.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span>{worker.available ? 'Available Now' : 'Currently Busy'}</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex border-b divide-x">
          <div className="flex-1 p-4 text-center">
            <div className="font-bold text-lg">{worker.experience}</div>
            <div className="text-xs text-gray-500 uppercase">Years Exp</div>
          </div>
          <div className="flex-1 p-4 text-center">
            <div className="font-bold text-lg">{worker.jobsCompleted}</div>
            <div className="text-xs text-gray-500 uppercase">Jobs</div>
          </div>
          <div className="flex-1 p-4 text-center">
            <div className="font-bold text-lg text-orange-500">★ {worker.rating}</div>
            <div className="text-xs text-gray-500 uppercase">{worker.reviewsCount} Reviews</div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Skills */}
          <section>
            <h2 className="font-bold text-lg mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map(skill => (
                <span key={skill} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-100">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* About */}
          <section>
            <h2 className="font-bold text-lg mb-3">About</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{worker.about}</p>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="font-bold text-lg mb-3">Reviews</h2>
            <div className="space-y-4">
              {worker.reviews.map(review => (
                <Card key={review.id} className="p-4 bg-gray-50 border-none shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-sm">{review.customer}</div>
                    <div className="text-orange-500 text-sm">{'★'.repeat(review.stars)}{'☆'.repeat(5-review.stars)}</div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="w-full max-w-2xl">
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-bold rounded-xl"
            onClick={() => navigate(`/customer/book/${worker.id}`)}
          >
            Book This Worker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
