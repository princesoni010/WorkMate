import React from 'react';
import { MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/money';
import { formatDateTime } from '../../utils/date';

const JobRequestCard = ({ booking, onAccept, onDecline }) => {
  return (
    <Card className="relative overflow-hidden">
      {booking.isEmergency && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" /> Emergency
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">{booking.serviceCategory}</h3>
        <p className="text-sm text-gray-500">Requested by {booking.customer?.name}</p>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-start text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
          <span>{booking.location?.address}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          <span>{formatDateTime(booking.scheduledAt)}</span>
        </div>
        <div className="flex items-center text-sm font-semibold text-gray-800">
          <span className="text-gray-500 mr-2">Est. Earnings:</span>
          {formatCurrency(booking.estimatedPrice * 0.8)} {/* Assuming 80% worker share */}
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => onAccept(booking.id)} className="flex-1" size="sm">Accept Job</Button>
        <Button onClick={() => onDecline(booking.id)} variant="outline" className="flex-1" size="sm">Decline</Button>
      </div>
    </Card>
  );
};

export default JobRequestCard;
