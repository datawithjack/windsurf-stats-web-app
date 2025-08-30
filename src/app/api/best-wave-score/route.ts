import { NextResponse } from 'next/server';
import { getBestWaveScore } from '../../../lib/api-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const athlete = searchParams.get('athlete');
  
  try {
    console.log('=== PROXYING TO API SERVER ===');
    console.log('=== PARAMS ===', { athlete });

    const data = await getBestWaveScore(
      athlete || undefined
    );

    console.log('=== API SERVER RESPONSE ===', Array.isArray(data) ? data.length + ' records' : data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to API server:', error);
    return NextResponse.json([], { status: 200 });
  }
}