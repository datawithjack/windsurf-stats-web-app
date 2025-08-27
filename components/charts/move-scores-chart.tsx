'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend, Tooltip } from 'recharts';
import { chartColors } from '../../lib/chart-colors';

interface MoveScoresChartProps {
  data: Array<{
    type: string;
    bestScore: number;
    averageScore: number;
  }>;
}

export function MoveScoresChart({ data }: MoveScoresChartProps) {
  console.log('=== MoveScoresChart DEBUG ===');
  console.log('Raw data received:', data);

  // Show message if no data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col">
        <h3 className="text-lg font-normal text-gray-900 mb-4 flex-shrink-0">
          Best and Average Counting Score by Move
        </h3>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No chart data available
        </div>
      </div>
    );
  }

  // Transform and sort data by best score (descending), then by type name
  const chartData = data
    .map(item => ({
      moveType: item.type,
      bestScore: Number(item.bestScore) || 0,
      averageScore: Number(item.averageScore) || 0
    }))
    .sort((a, b) => {
      // First sort by best score (descending)
      if (b.bestScore !== a.bestScore) {
        return b.bestScore - a.bestScore;
      }
      // If best scores are equal, sort by type name (ascending)
      return a.moveType.localeCompare(b.moveType);
    });

  console.log('Chart data (sorted):', chartData);

  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col">
      <h3 className="text-lg font-normal text-gray-900 mb-4 flex-shrink-0">
        Best and Average Counting Score by Type
      </h3>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 80, bottom: 20 }}
            barCategoryGap="35%"
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.7} horizontal={false} />
            <XAxis 
              type="number"
              domain={[0, 'dataMax']}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              type="category"
              dataKey="moveType"
              width={70}
              tick={{ fontSize: 13, fill: '#374151' }}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip 
              formatter={(value, name) => [
                Number(value).toFixed(2), 
                name === 'bestScore' ? 'Best Score' : 'Average Score'
              ]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#374151', fontWeight: 'normal' }}
            />
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px', 
                color: '#6b7280',
                paddingTop: '10px'
              }}
            />
            <Bar 
              dataKey="bestScore" 
              fill={chartColors.primary}
              name="Best Score"
              radius={[0, 3, 3, 0]}
              barSize={24}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar 
              dataKey="averageScore" 
              fill={chartColors.secondary}
              name="Average Score"  
              radius={[0, 3, 3, 0]}
              barSize={24}
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