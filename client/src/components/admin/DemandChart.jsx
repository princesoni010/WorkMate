import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const DemandChart = ({ data, title }) => {
  return (
    <Card className="h-96 w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title || 'Service Demand Forecast'}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip 
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="demand" fill="#FF9933" radius={[4, 4, 0, 0]} name="Current Demand" />
            <Bar dataKey="forecast" fill="#1E40AF" radius={[4, 4, 0, 0]} name="Forecasted Demand" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DemandChart;
