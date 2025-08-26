'use client';

import React from 'react';

export interface BestHeatScore {
  heatNo: string;
  athlete: string;
  totalPoints: number;
  wavePoints: number;
  jumpPoints: number;
}

interface BestHeatScoresTableProps {
  data: BestHeatScore[];
  title?: string;
}

export function BestHeatScoresTable({ data, title = "Best Heat Scores" }: BestHeatScoresTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 overflow-hidden h-full flex flex-col">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-normal text-gray-800">{title}</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 overflow-hidden h-full flex flex-col">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-lg font-normal text-gray-800">{title}</h3>
      </div>
      <div className="overflow-auto flex-1 max-h-96">
        <table className="w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Heat No</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Athlete</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Total Points</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((score, index) => (
              <tr 
                key={`${score.heatNo}-${score.athlete}-${index}`} 
                className="hover:bg-gray-50 group relative"
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{score.heatNo}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{score.athlete}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900 relative cursor-help">
                  <div className="relative inline-block">
                    {Number(score.totalPoints || 0).toFixed(2)}
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      <div className="space-y-1">
                        <div>Wave Points: {Number(score.wavePoints || 0).toFixed(2)}</div>
                        <div>Jump Points: {Number(score.jumpPoints || 0).toFixed(2)}</div>
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}