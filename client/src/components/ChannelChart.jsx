import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B']; 

const ChannelChart = ({ orders }) => {
  const data = [
    { name: 'Shopify', value: orders.filter(o => o.channel === 'Shopify').length },
    { name: 'Amazon', value: orders.filter(o => o.channel === 'Amazon').length },
    { name: 'eBay', value: orders.filter(o => o.channel === 'eBay').length },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
        📊 Orders by Channel
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={40}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} Orders`, name]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChannelChart;
