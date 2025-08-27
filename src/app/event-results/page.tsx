'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ResponsiveNav } from '../../../components/ui/responsive-nav';

interface EventResult {
  Position: number;
  Rider: string;
  Sponsors: string;
  [key: string]: any;
}

export default function EventResultsPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const eventName = searchParams.get('eventName') || '2025 Gran Canaria GLORIA PWA Windsurfing Grand Slam';
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [results, setResults] = useState<EventResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState<string>('Men');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const params = new URLSearchParams();
        if (eventId) params.append('eventId', eventId);
        if (selectedGender) params.append('gender', selectedGender);
        
        const url = `/api/event-results?${params.toString()}`;
        console.log('Fetching from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Event results received:', data);
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          console.error('Data is not an array:', data);
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching event results:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [eventId, selectedGender]);

  if (loading) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed relative flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://www.pwaworldtour.com/typo3conf/ext/sitepackage/Resources/Public/Images/bg_main.jpg)'
        }}
      >
        <div className="text-xl text-white">Loading event results...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: 'url(https://www.pwaworldtour.com/typo3conf/ext/sitepackage/Resources/Public/Images/bg_main.jpg)'
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        
        {/* Header with Logo and Navigation */}
        <div className="mb-8">
          <div className="bg-black/80 text-white px-6 py-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-red-600 text-white px-3 py-2 rounded-full font-normal text-sm">
                  PWA
                </div>
                <h1 className="text-lg font-normal">
                  World Wave Tour Stats
                </h1>
              </div>
              <ResponsiveNav currentPage="events" />
            </div>
          </div>
        </div>

        {/* Event Name and Filters Bar */}
        <div className="text-white px-6 py-4 mb-8 rounded-lg shadow-lg relative" style={{background: 'linear-gradient(to right, #1abc9c 50%, #477fae)'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-xl font-normal">{eventName}</h2>
            </div>
            
            {/* Desktop Buttons - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href={`/event-stats?eventId=${eventId}&eventName=${encodeURIComponent(eventName)}`}>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-sm font-normal transition-colors border border-white/20">
                  Event Stats
                </button>
              </Link>
              <button className="bg-white/40 text-white px-4 py-2 rounded text-sm font-normal shadow-sm border border-white/60">
                Results & Elimination Ladder
              </button>
            </div>
            
            {/* Desktop Gender filters - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => setSelectedGender('Men')}
                className={`px-3 py-1 rounded text-sm font-normal transition-colors border ${
                  selectedGender === 'Men' 
                    ? 'bg-white/40 text-white border-white/60 shadow-sm' 
                    : 'bg-white/20 hover:bg-white/30 border-white/30'
                }`}
              >
                Men
              </button>
              <button 
                onClick={() => setSelectedGender('Women')}
                className={`px-3 py-1 rounded text-sm font-normal transition-colors border ${
                  selectedGender === 'Women' 
                    ? 'bg-white/40 text-white border-white/60 shadow-sm' 
                    : 'bg-white/10 hover:bg-white/20 border-white/20'
                }`}
              >
                Women
              </button>
            </div>
            
            {/* Mobile Hamburger Menu - Shown only on small screens */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </div>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg z-50">
              <div className="p-4 space-y-3">
                <Link href={`/event-stats?eventId=${eventId}&eventName=${encodeURIComponent(eventName)}`} className="block">
                  <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors">
                    Event Stats
                  </button>
                </Link>
                <button className="w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 shadow-sm rounded font-normal">
                  Results & Elimination Ladder
                </button>
                <hr className="border-gray-200" />
                <button 
                  onClick={() => {
                    setSelectedGender('Men');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-gray-800 rounded transition-colors ${
                    selectedGender === 'Men' ? 'bg-gray-100 border border-gray-300 shadow-sm font-normal' : 'hover:bg-gray-100'
                  }`}
                >
                  Men
                </button>
                <button 
                  onClick={() => {
                    setSelectedGender('Women');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-gray-800 rounded transition-colors ${
                    selectedGender === 'Women' ? 'bg-gray-100 border border-gray-300 shadow-sm font-normal' : 'hover:bg-gray-100'
                  }`}
                >
                  Women
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Table and Elimination Ladder - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6 mb-8 h-[500px]">
          {/* Results Table - 30% width */}
          <div className="min-w-0 h-full">
            <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-lg font-normal text-gray-800">Event Results</h3>
                <div className="h-8"></div>
              </div>
              
              <div className="overflow-auto flex-1 max-h-[500px]">
                <table className="min-w-full">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 text-center text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Position</th>
                      <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Rider</th>
                      <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase tracking-wider bg-gray-100">Sponsors</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {results.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                          No results available for this event
                        </td>
                      </tr>
                    ) : (
                      results.map((result, index) => (
                        <tr key={index} className="hover:bg-gray-50 group relative">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900 text-center">
                            {result.Position}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">
                            {result.Rider}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-normal text-gray-900">
                            {result.Sponsors}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Elimination Ladder Placeholder - 70% width */}
          <div className="min-w-0 h-full">
            <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-lg font-normal text-gray-800">Elimination Ladder</h3>
                <div className="h-8"></div>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">🏆</div>
                  <p className="text-lg">Elimination Ladder</p>
                  <p className="text-sm mt-2">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}