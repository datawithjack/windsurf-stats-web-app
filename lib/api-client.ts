// API client for communicating with the standalone API server
import { AthleteResult, AthleteFilter, YearFilter, Event, HeatData, ChartData } from './types';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:3001';

// Generic API response type
interface APIResponse<T> {
  status: 'success' | 'error';
  data: T;
  error?: string;
}

// Generic fetch wrapper with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    console.log(`🌐 API Request: ${API_BASE_URL}${endpoint}`);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add credentials if needed for CORS
      // credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: APIResponse<T> = await response.json();
    
    if (result.status === 'error') {
      throw new Error(result.error || 'API returned error status');
    }

    return result.data;
  } catch (error) {
    console.error(`❌ API Request failed for ${endpoint}:`, error);
    
    // Return empty/fallback data based on expected type
    // This matches the current fallback behavior in Next.js routes
    if (endpoint.includes('athlete-filters')) {
      return { athletes: [], years: [] } as T;
    } else if (endpoint.includes('rider-count') && !endpoint.includes('rider-counts')) {
      return { count: 0 } as T;
    } else {
      return [] as T;
    }
  }
}

// API client methods - matching the existing Next.js API structure

export const apiClient = {
  // Athlete profile results with filtering
  async getAthleteProfileResults(athlete?: string, year?: string): Promise<AthleteResult[]> {
    const params = new URLSearchParams();
    if (athlete) params.append('athlete', athlete);
    if (year) params.append('year', year);
    
    const queryString = params.toString();
    const endpoint = `/api/athlete-profile-results${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest<AthleteResult[]>(endpoint);
  },

  // Athlete filters (athletes and years)
  async getAthleteFilters(): Promise<{ athletes: AthleteFilter[]; years: YearFilter[] }> {
    return apiRequest<{ athletes: AthleteFilter[]; years: YearFilter[] }>('/api/athlete-filters');
  },

  // Calendar events
  async getCalendarEvents(): Promise<Event[]> {
    return apiRequest<Event[]>('/api/calendar');
  },

  // Heat data with optional event filtering
  async getHeatData(eventId?: string): Promise<any[]> {
    const endpoint = eventId ? `/api/heat-data?eventId=${eventId}` : '/api/heat-data';
    return apiRequest<any[]>(endpoint);
  },

  // Heatsheets with optional event filtering
  async getHeatsheets(eventId?: string): Promise<any[]> {
    const endpoint = eventId ? `/api/heatsheets?eventId=${eventId}` : '/api/heatsheets';
    return apiRequest<any[]>(endpoint);
  },

  // Best heat scores
  async getBestHeatScores(athlete?: string): Promise<any[]> {
    const endpoint = athlete ? `/api/best-heat-scores?athlete=${athlete}` : '/api/best-heat-scores';
    return apiRequest<any[]>(endpoint);
  },

  // Best jumps and waves
  async getBestJumpsWaves(athlete?: string): Promise<any[]> {
    const endpoint = athlete ? `/api/best-jumps-waves?athlete=${athlete}` : '/api/best-jumps-waves';
    return apiRequest<any[]>(endpoint);
  },

  // Rider counts by event
  async getRiderCounts(): Promise<any[]> {
    return apiRequest<any[]>('/api/rider-counts');
  },

  // Chart data
  async getChartData(): Promise<ChartData[]> {
    return apiRequest<ChartData[]>('/api/chart-data');
  },

  // Best wave score
  async getBestWaveScore(athlete?: string): Promise<any[]> {
    const endpoint = athlete ? `/api/best-wave-score?athlete=${athlete}` : '/api/best-wave-score';
    return apiRequest<any[]>(endpoint);
  },

  // Best jump score
  async getBestJumpScore(athlete?: string): Promise<any[]> {
    const endpoint = athlete ? `/api/best-jump-score?athlete=${athlete}` : '/api/best-jump-score';
    return apiRequest<any[]>(endpoint);
  },

  // Best heat score
  async getBestHeatScore(athlete?: string): Promise<any[]> {
    const endpoint = athlete ? `/api/best-heat-score?athlete=${athlete}` : '/api/best-heat-score';
    return apiRequest<any[]>(endpoint);
  },

  // Event results
  async getEventResults(eventId?: string): Promise<AthleteResult[]> {
    const endpoint = eventId ? `/api/event-results?eventId=${eventId}` : '/api/event-results';
    return apiRequest<AthleteResult[]>(endpoint);
  },

  // Single event rider count
  async getRiderCount(eventId?: string): Promise<{ count: number }> {
    const endpoint = eventId ? `/api/rider-count?eventId=${eventId}` : '/api/rider-count';
    return apiRequest<{ count: number }>(endpoint);
  },

  // Health check
  async getHealth(): Promise<any> {
    return apiRequest<any>('/api/health');
  },
};

// Convenience exports for backward compatibility
export const {
  getAthleteProfileResults,
  getAthleteFilters,
  getCalendarEvents,
  getHeatData,
  getHeatsheets,
  getBestHeatScores,
  getBestJumpsWaves,
  getRiderCounts,
  getChartData,
  getBestWaveScore,
  getBestJumpScore,
  getBestHeatScore,
  getEventResults,
  getRiderCount,
  getHealth,
} = apiClient;

// Development helper
if (process.env.NODE_ENV === 'development') {
  console.log(`🔗 API Client configured with base URL: ${API_BASE_URL}`);
}