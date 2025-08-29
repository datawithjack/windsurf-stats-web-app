'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { chartColors } from '../../lib/chart-colors';

interface SuccessRateChartProps {
  data: Array<{
    name: string;
    value: number;
    percentage?: number;
  }>;
}

export function SuccessRateChart({ data }: SuccessRateChartProps) {
  console.log('=== SuccessRateChart DEBUG ===');
  console.log('Raw data received:', data);

  // Show message if no data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col">
        <h3 className="text-lg font-normal text-gray-900 mb-4 flex-shrink-0">
          Success Rate Distribution
        </h3>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No chart data available
        </div>
      </div>
    );
  }

  // Transform data and add colors
  const chartData = data.map((item) => ({
    name: item.name,
    value: Number(item.value) || 0,
    percentage: item.percentage || 0
  }));

  // Color palette for pie chart segments
  const COLORS = [
    chartColors.primary,
    chartColors.secondary,
    chartColors.tertiary,
    chartColors.quaternary,
    chartColors.quinary
  ];

  console.log('Chart data (transformed):', chartData);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="normal"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col">
      <h3 className="text-lg font-normal text-gray-900 mb-4 flex-shrink-0">
        Success Rate Distribution
      </h3>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [
                `${Number(value).toFixed(0)}`,
                name
              ]}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}