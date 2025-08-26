'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend, Tooltip } from 'recharts';
import { chartColors } from '../../lib/chart-colors';

interface BestAverageChartProps {
  data: Array<{
    category: string;
    best: number;
    average: number;
  }>;
}

export function BestAverageChart({ data }: BestAverageChartProps) {
  console.log('=== BestAverageChart DEBUG ===');
  console.log('Raw data received:', data);

  // Show message if no data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col">
        <h3 className="text-lg font-normal text-gray-900 mb-4 flex-shrink-0">
          Best vs Average Performance
        </h3>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No chart data available
        </div>
      </div>
    );
  }

  // Transform and sort data by best score (descending)
  const chartData = data
    .map(item => ({
      category: item.category,
      best: Number(item.best) || 0,
      average: Number(item.average) || 0
    }))
    .sort((a, b) => b.best - a.best);

  console.log('Chart data (sorted):', chartData);

  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col">
      <h3 className="text-lg font-normal text-gray-900 mb-4 flex-shrink-0">
        Best vs Average Performance
      </h3>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            barCategoryGap="20%"
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="category"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              domain={[0, 'dataMax']}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value, name) => [
                Number(value).toFixed(2), 
                name === 'best' ? 'Best Score' : 'Average Score'
              ]}
            />
            <Legend />
            <Bar 
              dataKey="best" 
              fill={chartColors.primary}
              name="Best Score"
              barSize={30}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar 
              dataKey="average" 
              fill={chartColors.secondary}
              name="Average Score"  
              barSize={30}
              animationBegin={200}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}