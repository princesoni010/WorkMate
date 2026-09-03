import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/money';

const EarningsCard = ({ period, amount, trend, comparisonText }) => {
  const isPositive = trend >= 0;

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{period}</p>
          <h4 className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(amount)}</h4>
        </div>
        <div className="p-2 bg-green-50 rounded-lg">
          <DollarSign className="h-6 w-6 text-secondary" />
        </div>
      </div>
      
      {comparisonText && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`flex items-center font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-500 ml-2">{comparisonText}</span>
        </div>
      )}
    </Card>
  );
};

export default EarningsCard;
