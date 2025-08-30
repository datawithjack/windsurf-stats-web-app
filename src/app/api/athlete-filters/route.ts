import { NextResponse } from 'next/server';
import { getAthleteFilters } from '../../../../lib/api-client';

export async function GET() {
  try {
    console.log('=== PROXYING ATHLETE FILTERS TO API SERVER ===');

    const data = await getAthleteFilters();

    console.log('=== API SERVER RESPONSE ===', {
      athletes: data.athletes?.length || 0,
      years: data.years?.length || 0
    });
    
    return NextResponse.json({
      athletes: data.athletes || [],
      years: data.years || []
    });
  } catch (error) {
    console.error('Error proxying athlete filters:', error);
    return NextResponse.json({ athletes: [], years: [] }, { status: 200 });
  }
} 