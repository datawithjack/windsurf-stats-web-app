'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AthleteProfile } from '../../../components/athletes/athlete-profile';
import { KPICards } from '../../../components/athletes/kpi-cards';
import { ResultsTable } from '../../../components/athletes/results-table';
import { BestAverageChart } from '../../../components/charts/best-average-chart';
import { SuccessRateChart } from '../../../components/charts/success-rate-chart';
import { ResponsiveNav } from '../../../components/ui/responsive-nav';
import { AthleteFilter, YearFilter, AthleteResult } from '../../../lib/types';

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<AthleteFilter[]>([]);
  const [years, setYears] = useState<YearFilter[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [results, setResults] = useState<AthleteResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [riderCounts, setRiderCounts] = useState({ male: 0, female: 0 });

  // Mock data for the charts
  const bestAverageData = [
    { type: 'Wave', bestScore: 8.2, averageScore: 4.7 },
    { type: 'Backloop', bestScore: 7.4, averageScore: 6.0 },
    { type: 'Forward Loop', bestScore: 6.9, averageScore: 5.9 },
    { type: 'Pushloop', bestScore: 6.3, averageScore: 5.9 },
    { type: 'Tabletop', bestScore: 3.1, averageScore: 3.1 },
  ];

  const successRateData = [
    { move: 'Wave', successRate: 91 },
    { move: 'Backloop', successRate: 95 },
    { move: 'Forward Loop', successRate: 93 },
    { move: 'Pushloop', successRate: 93 },
    { move: 'Tabletop', successRate: 100 },
  ];

  // Fetch filter options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('/api/athlete-filters');
        const data = await response.json();
        setAthletes(data.athletes || []);
        setYears(data.years || []);
        
        // Set default selections if available
        if (data.athletes && data.athletes.length > 0) {
          setSelectedAthlete(data.athletes[0].athlete_name);
        }
        if (data.years && data.years.length > 0) {
          setSelectedYear(data.years[0].year.toString());
        }
      } catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
        setFiltersLoading(false);
      }
    };

    fetchFilters();
  }, []);

  // Fetch rider counts
  const fetchRiderCounts = async (eventId?: string) => {
    try {
      const params = new URLSearchParams();
      if (eventId) params.append('event_id', eventId);
      
      const response = await fetch(`/api/rider-counts?${params.toString()}`);
      const data = await response.json();
      
      // Process the data to get totals for male and female
      const maleTotal = data
        .filter((item: any) => item.gender === 'Men')
        .reduce((sum: number, item: any) => sum + item.total, 0);
      
      const femaleTotal = data
        .filter((item: any) => item.gender === 'Women')
        .reduce((sum: number, item: any) => sum + item.total, 0);
      
      setRiderCounts({ male: maleTotal, female: femaleTotal });
    } catch (error) {
      console.error('Error fetching rider counts:', error);
      setRiderCounts({ male: 0, female: 0 });
    }
  };

  // Fetch rider counts on component mount and when filters change
  useEffect(() => {
    fetchRiderCounts();
  }, []);

  // Fetch results when filters change
  useEffect(() => {
    const fetchResults = async () => {
      if (!selectedAthlete && !selectedYear) return;
      
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedAthlete) params.append('athlete', selectedAthlete);
        if (selectedYear) params.append('year', selectedYear);
        
        const response = await fetch(`/api/athlete-profile-results?${params.toString()}`);
        const data = await response.json();
        setResults(data || []);
      } catch (error) {
        console.error('Error fetching results:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [selectedAthlete, selectedYear]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: 'url(https://www.pwaworldtour.com/typo3conf/ext/sitepackage/Resources/Public/Images/bg_main.jpg)'
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        
        {/* Header */}
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
              <ResponsiveNav currentPage="athletes" />
            </div>
          </div>
        </div>

        {/* Athlete Profile Header */}
        <div className="bg-teal-500 text-white px-6 py-4 mb-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Athlete Profile</h2>
            <div className="flex items-center space-x-4">
              <select 
                className="bg-teal-600 text-white px-3 py-1 rounded text-sm border-none"
                value={selectedAthlete}
                onChange={(e) => setSelectedAthlete(e.target.value)}
                disabled={filtersLoading}
              >
                {filtersLoading ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    <option value="">All Athletes</option>
                    {athletes.map((athlete, index) => (
                      <option key={index} value={athlete.athlete_name}>
                        {athlete.athlete_name}
                      </option>
                    ))}
                  </>
                )}
              </select>
              <select 
                className="bg-teal-600 text-white px-3 py-1 rounded text-sm border-none"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                disabled={filtersLoading}
              >
                {filtersLoading ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    <option value="">All Years</option>
                    {years.map((year, index) => (
                      <option key={index} value={year.year.toString()}>
                        {year.year}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Athlete Profile */}
          <div className="lg:col-span-1">
            <AthleteProfile />
          </div>

          {/* Right Column - KPI Cards */}
          <div className="lg:col-span-2">
            <KPICards riderCounts={riderCounts} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Results Table */}
          <div className="lg:col-span-1">
            <ResultsTable results={results} loading={loading} />
          </div>

          {/* Charts */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BestAverageChart data={bestAverageData} />
              <SuccessRateChart data={successRateData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 