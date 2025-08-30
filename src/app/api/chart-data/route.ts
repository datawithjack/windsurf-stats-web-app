import { NextResponse } from 'next/server';
import { getChartData } from '../../../lib/api-client';

export async function GET() {

  
  try {
    console.log('=== PROXYING TO API SERVER ===');
    

    const data = await getChartData();

    console.log('=== API SERVER RESPONSE ===', Array.isArray(data) ? data.length + ' records' : data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to API server:', error);
    return NextResponse.json([], { status: 200 });
  }
}