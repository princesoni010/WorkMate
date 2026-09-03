import React from 'react';
import { Star, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const WorkerCard = ({ worker, onBook, onViewProfile }) => {
  return (
    <Card className="flex flex-col sm:flex-row gap-5">
      <div className="flex-shrink-0 flex justify-center sm:justify-start">
        <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-4 border-white shadow-sm">
          {worker.photoUrl ? (
            <img src={worker.photoUrl} alt={worker.user?.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-3xl text-gray-500 font-semibold">{worker.user?.name?.charAt(0)}</span>
          )}
        </div>
      </div>
      
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                {worker.user?.name}
                {worker.isVerified && <ShieldCheck className="ml-2 h-5 w-5 text-secondary" />}
              </h3>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                {worker.cooperativeName || 'Independent Cooperative Member'}
              </p>
            </div>
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-semibold">{worker.rating?.toFixed(1) || 'New'}</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {worker.skills?.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md">
                {skill.serviceCategory}
              </span>
            ))}
          </div>

          <div className="mt-2 text-sm text-gray-600 flex items-center gap-4">
            <span>{worker.experienceYears} years exp.</span>
            {worker.distance && (
              <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {worker.distance} km away</span>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          {onBook && <Button onClick={onBook} size="sm" className="flex-1">Book Now</Button>}
          {onViewProfile && <Button onClick={onViewProfile} variant="outline" size="sm" className="flex-1">View Profile</Button>}
        </div>
      </div>
    </Card>
  );
};

export default WorkerCard;
