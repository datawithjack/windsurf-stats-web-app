'use client';

import React, { useState } from 'react';
import { chartColors } from '../../lib/chart-colors';

export interface BestJumpWave {
  heatNo: string;
  athlete: string;
  score: number;
  counting: string;
  scoreType: string;
}

interface BestJumpsWavesTableProps {
  data: BestJumpWave[];
  title?: string;
  onFilterChange: (filter: 'Jump' | 'Wave') => void;
  currentFilter: 'Jump' | 'Wave';
}

export function BestJumpsWavesTable({ 
  data, 
  title = "Best Jumps and Waves", 
  onFilterChange,
  currentFilter 
}: BestJumpsWavesTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-lg font-normal text-gray-800">{title}</h3>
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => onFilterChange('Jump')}
              className={`px-3 py-1 text-sm font-normal transition-colors ${
                currentFilter === 'Jump'
                  ? 'bg-[#1abc9c] text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Jumps
            </button>
            <button
              onClick={() => onFilterChange('Wave')}
              className={`px-3 py-1 text-sm font-normal transition-colors ${
                currentFilter === 'Wave'
                  ? 'bg-[#1abc9c] text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Waves
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-normal text-gray-800">{title}</h3>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => onFilterChange('Jump')}
            className={`px-3 py-1 text-sm font-normal transition-colors ${
              currentFilter === 'Jump'
                ? 'bg-[#1abc9c] text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Jumps
          </button>
          <button
            onClick={() => onFilterChange('Wave')}
            className={`px-3 py-1 text-sm font-normal transition-colors ${
              currentFilter === 'Wave'
                ? 'bg-[#1abc9c] text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Waves
          </button>
        </div>
      </div>
      
      <div className="overflow-auto flex-1 max-h-96">
        <table className="min-w-full">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Athlete</th>
              <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Score</th>
              {currentFilter === 'Jump' && (
                <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Score Type</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr 
                key={`${item.heatNo}-${item.athlete}-${index}`} 
                className="hover:bg-gray-50 group relative"
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.athlete}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900 relative cursor-help">
                  <div className="relative inline-block">
                    {Number(item.score || 0).toFixed(2)}
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      <div className="space-y-1">
                        <div>Heat No: {item.heatNo}</div>
                        <div>Counting: {item.counting}</div>
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </td>
                {currentFilter === 'Jump' && (
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.scoreType}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}