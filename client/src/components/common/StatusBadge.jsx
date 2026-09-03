import React from 'react';
import { useTranslation } from 'react-i18next';
import { BOOKING_STATUSES, WORKER_STATUSES, GRIEVANCE_TYPES } from '../../utils/constants';

const StatusBadge = ({ status, type = 'booking' }) => {
  const { t } = useTranslation();
  
  let configArray = [];
  if (type === 'booking') configArray = BOOKING_STATUSES;
  else if (type === 'worker') configArray = WORKER_STATUSES;
  
  const config = configArray.find(item => item.value === status) || { label: status, color: 'gray' };
  
  const colorMap = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
    orange: 'bg-orange-100 text-orange-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorMap[config.color]}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
