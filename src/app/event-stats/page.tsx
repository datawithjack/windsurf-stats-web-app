'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { StatsCard } from '../../../components/ui/stats-card';
import { ResponsiveNav } from '../../../components/ui/responsive-nav';
import { MoveScoresChart } from '../../../components/charts/move-scores-chart';
import { BestHeatScoresTable, BestHeatScore } from '../../../components/ui/best-heat-scores-table';
import { BestJumpsWavesTable, BestJumpWave } from '../../../components/ui/best-jumps-waves-table';
import { HeatData } from '../../../lib/types';

function EventStatsContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const eventName = searchParams.get('eventName') || '2025 Gran Canaria GLORIA PWA Windsurfing Grand Slam';
  
  const [, setHeatData] = useState<HeatData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('Men');
  const [riderCount, setRiderCount] = useState<number>(0);
  const [bestHeatScore, setBestHeatScore] = useState<{score: number, subtitle: string, isMultiple: boolean}>({
    score: 0,
    subtitle: '- Heat',
    isMultiple: false
  });
  const [bestWaveScore, setBestWaveScore] = useState<{score: number, subtitle: string, isMultiple: boolean}>({
    score: 0,
    subtitle: '- Heat',
    isMultiple: false
  });
  const [bestJumpScore, setBestJumpScore] = useState<{score: number, subtitle: string, description: string, isMultiple: boolean}>({
    score: 0,
    subtitle: '- Heat',
    description: '',
    isMultiple: false
  });
  const [chartData, setChartData] = useState<{type: string, bestScore: number, averageScore: number}[]>([]);
  const [bestHeatScores, setBestHeatScores] = useState<BestHeatScore[]>([]);
  const [bestJumpsWaves, setBestJumpsWaves] = useState<BestJumpWave[]>([]);
  const [jumpsWavesFilter, setJumpsWavesFilter] = useState<'Jump' | 'Wave'>('Jump');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = eventId ? `/api/heat-data?eventId=${eventId}` : '/api/heat-data';
        console.log('Fetching from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Heat data received:', data);
        setHeatData(data);
      } catch (error) {
        console.error('Error fetching heat data:', error);
        setHeatData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  // Fetch rider count based on gender filter
  useEffect(() => {
    const fetchRiderCount = async () => {
      try {
        const params = new URLSearchParams();
        if (eventId) params.append('eventId', eventId);
        if (selectedGender) params.append('gender', selectedGender);
        
        const url = `/api/rider-count?${params.toString()}`;
        console.log('Fetching rider count from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Rider count received:', data);
        
        setRiderCount(data.count || 0);
      } catch (error) {
        console.error('Error fetching rider count:', error);
        setRiderCount(0);
      }
    };

    fetchRiderCount();
  }, [eventId, selectedGender]);

  // Fetch best heat score based on gender filter
  useEffect(() => {
    const fetchBestHeatScore = async () => {
      try {
        const params = new URLSearchParams();
        if (eventId) params.append('eventId', eventId);
        if (selectedGender) params.append('gender', selectedGender);
        
        const url = `/api/best-heat-score?${params.toString()}`;
        console.log('Fetching best heat score from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Best heat score received:', data);
        
        setBestHeatScore({
          score: Number(data.score) || 0,
          subtitle: data.subtitle || '- Heat',
          isMultiple: data.isMultiple || false
        });
      } catch (error) {
        console.error('Error fetching best heat score:', error);
        setBestHeatScore({
          score: 0,
          subtitle: '- Heat',
          isMultiple: false
        });
      }
    };

    fetchBestHeatScore();
  }, [eventId, selectedGender]);

  // Fetch best wave score based on gender filter
  useEffect(() => {
    const fetchBestWaveScore = async () => {
      try {
        const params = new URLSearchParams();
        if (eventId) params.append('eventId', eventId);
        if (selectedGender) params.append('gender', selectedGender);
        
        const url = `/api/best-wave-score?${params.toString()}`;
        console.log('Fetching best wave score from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Best wave score received:', data);
        
        setBestWaveScore({
          score: Number(data.score) || 0,
          subtitle: data.subtitle || '- Heat',
          isMultiple: data.isMultiple || false
        });
      } catch (error) {
        console.error('Error fetching best wave score:', error);
        setBestWaveScore({
          score: 0,
          subtitle: '- Heat',
          isMultiple: false
        });
      }
    };

    fetchBestWaveScore();
  }, [eventId, selectedGender]);

  // Fetch best jump score based on gender filter
  useEffect(() => {
    const fetchBestJumpScore = async () => {
      try {
        const params = new URLSearchParams();
        if (eventId) params.append('eventId', eventId);
        if (selectedGender) params.append('gender', selectedGender);
        
        const url = `/api/best-jump-score?${params.toString()}`;
        console.log('Fetching best jump score from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Best jump score received:', data);
        
        setBestJumpScore({
          score: Number(data.score) || 0,
          subtitle: data.subtitle || '- Heat',
          description: data.description || '',
          isMultiple: data.isMultiple || false
        });
      } catch (error) {
        console.error('Error fetching best jump score:', error);
        setBestJumpScore({
          score: 0,
          subtitle: '- Heat',
          description: '',
          isMultiple: false
        });
      }
    };

    fetchBestJumpScore();
  }, [eventId, selectedGender]);

  // Fetch chart data based on gender filter
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const params = new URLSearchParams();
        if (eventId) params.append('eventId', eventId);
        if (selectedGender) params.append('gender', selectedGender);
        
        const url = `/api/chart-data?${params.toString()}`;
        console.log('Fetching chart data from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Chart data received:', data);
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setChartData(data);
        } else {
          console.error('Chart data is not an array:', data);
          setChartData([]);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData([]);
      }
    };

    fetchChartData();
  }, [eventId, selectedGender]);

  // Fetch best heat scores based on gender filter
  useEffect(() => {
    const fetchBestHeatScores = async () => {
      try {
        const params = new URLSearchParams();
        if (eventId) params.append('eventId', eventId);
        if (selectedGender) params.append('gender', selectedGender);
        
        const url = `/api/best-heat-scores?${params.toString()}`;
        console.log('Fetching best heat scores from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Best heat scores received:', data);
        
        setBestHeatScores(data || []);
      } catch (error) {
        console.error('Error fetching best heat scores:', error);
        setBestHeatScores([]);
      }
    };

    fetchBestHeatScores();
  }, [eventId, selectedGender]);

  // Fetch best jumps and waves based on gender and filter
  useEffect(() => {
    const fetchBestJumpsWaves = async () => {
      try {
        const params = new URLSearchParams();
        if (eventId) params.append('eventId', eventId);
        if (selectedGender) params.append('gender', selectedGender);
        params.append('typeCat', jumpsWavesFilter);
        
        const url = `/api/best-jumps-waves?${params.toString()}`;
        console.log('Fetching best jumps/waves from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Best jumps/waves received:', data);
        
        setBestJumpsWaves(data || []);
      } catch (error) {
        console.error('Error fetching best jumps/waves:', error);
        setBestJumpsWaves([]);
      }
    };

    fetchBestJumpsWaves();
  }, [eventId, selectedGender, jumpsWavesFilter]);


  if (loading) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed relative flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://www.pwaworldtour.com/typo3conf/ext/sitepackage/Resources/Public/Images/bg_main.jpg)'
        }}
      >
        <div className="text-xl text-white">Loading event stats...</div>
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
              <h2 className="text-xl font-semibold">{eventName}</h2>
            </div>
            
            {/* Desktop Buttons - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2">
              <button className="bg-white/40 text-white px-4 py-2 rounded text-sm font-medium shadow-sm border border-white/60">
                Event Stats
              </button>
              <Link href={`/event-results?eventId=${eventId}&eventName=${encodeURIComponent(eventName)}`}>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-sm font-medium transition-colors border border-white/20">
                  Results & Elimination Ladder
                </button>
              </Link>
            </div>
            
            {/* Desktop Gender filters - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={() => setSelectedGender('Men')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors border ${
                  selectedGender === 'Men' 
                    ? 'bg-white/40 text-white border-white/60 shadow-sm' 
                    : 'bg-white/20 hover:bg-white/30 border-white/30'
                }`}
              >
                Men
              </button>
              <button 
                onClick={() => setSelectedGender('Women')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors border ${
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
                <button className="w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 shadow-sm rounded font-medium">
                  Event Stats
                </button>
                <Link href={`/event-results?eventId=${eventId}&eventName=${encodeURIComponent(eventName)}`} className="block">
                  <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors">
                    Results & Elimination Ladder
                  </button>
                </Link>
                <hr className="border-gray-200" />
                <button 
                  onClick={() => {
                    setSelectedGender('Men');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-gray-800 rounded transition-colors ${
                    selectedGender === 'Men' ? 'bg-gray-100 border border-gray-300 shadow-sm font-medium' : 'hover:bg-gray-100'
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
                    selectedGender === 'Women' ? 'bg-gray-100 border border-gray-300 shadow-sm font-medium' : 'hover:bg-gray-100'
                  }`}
                >
                  Women
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Riders"
            value={riderCount}
          />
          <StatsCard 
            title="Best Heat Score"
            value={`${(Number(bestHeatScore.score) || 0).toFixed(2)} pts`}
            subtitle={bestHeatScore.subtitle}
          />
          <StatsCard 
            title="Best Jump Score"
            value={`${(Number(bestJumpScore.score) || 0).toFixed(2)} pts`}
            subtitle={bestJumpScore.subtitle}
            description={bestJumpScore.description}
          />
          <StatsCard 
            title="Best Wave Score"
            value={`${(Number(bestWaveScore.score) || 0).toFixed(2)} pts`}
            subtitle={bestWaveScore.subtitle}
          />
        </div>

        {/* All Three Elements in Same Row - Equal Width */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 h-[500px]">
          {/* Chart */}
          <div className="min-w-0 h-full">
            <MoveScoresChart data={chartData} />
          </div>
          
          {/* Best Heat Scores Table */}
          <div className="min-w-0 h-full">
            <BestHeatScoresTable data={bestHeatScores} />
          </div>
          
          {/* Best Jumps and Waves Table */}
          <div className="min-w-0 h-full">
            <BestJumpsWavesTable 
              data={bestJumpsWaves}
              currentFilter={jumpsWavesFilter}
              onFilterChange={setJumpsWavesFilter}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function EventStatsPage() {
  return (
    <Suspense fallback={
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed relative flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://www.pwaworldtour.com/typo3conf/ext/sitepackage/Resources/Public/Images/bg_main.jpg)'
        }}
      >
        <div className="text-xl text-white">Loading event stats...</div>
      </div>
    }>
      <EventStatsContent />
    </Suspense>
  );
} 