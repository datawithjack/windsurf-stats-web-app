import { NextResponse } from 'next/server';
import { getAthleteProfileResults } from '../../../../lib/api-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const athlete = searchParams.get('athlete');
  const year = searchParams.get('year');
  
  try {
    console.log('=== PROXYING TO API SERVER ===');
    console.log('=== PARAMS ===', { athlete, year });

    const data = await getAthleteProfileResults(
      athlete || undefined, 
      year || undefined
    );

    console.log('=== API SERVER RESPONSE ===', data.length, 'records');
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying athlete profile results:', error);
    return NextResponse.json([], { status: 200 });
  }
} 