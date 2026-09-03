import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../common/Card';

const MetricCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) => {
  const isPositive = trend === 'up';

  const colorMap = {
    primary: 'text-primary bg-primary-light bg-opacity-20',
    secondary: 'text-secondary bg-secondary-light bg-opacity-20',
    blue: 'text-blue-600 bg-blue-100',
    purple: 'text-purple-600 bg-purple-100',
    red: 'text-red-600 bg-red-100',
  };

  return (
    <Card padding="md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorMap[color] || colorMap.primary}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
      
      {trendValue && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`flex items-center font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {trendValue}
          </span>
          <span className="text-gray-500 ml-2">vs last month</span>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
