import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

interface ChartDataResult {
  score_type: string;
  best: number;
  average: number;
}

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'jfa_heatwave_db',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');
  const gender = searchParams.get('gender');

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Use view_heat_scores as requested
    let query = `
      SELECT 
        Type as score_type,
        MAX(Score) as best,
        AVG(Score) as average
      FROM view_heat_scores
      WHERE Type IS NOT NULL 
        AND Score IS NOT NULL 
        AND Score > 0
        AND Counting = 'Yes'
    `;
    
    const queryParams: (string | number)[] = [];
    
    // Add event filtering when eventId is provided
    if (eventId) {
      query += ' AND event_id = ?';
      queryParams.push(parseInt(eventId));
    }
    
    // Add gender filtering when gender is provided
    if (gender) {
      query += ' AND Gender = ?';
      queryParams.push(gender);
    }
    
    query += ' GROUP BY Type ORDER BY Type';
    
    console.log('Executing chart data query:', query, 'with params:', queryParams);
    
    const [rows] = await connection.execute(query, queryParams);
    await connection.end();
    
    const results = Array.isArray(rows) ? rows as ChartDataResult[] : [];
    console.log('Chart data results:', results);
    
    // Transform data for the chart component
    const chartData = results.map(row => ({
      type: (row?.score_type || '').toString().trim(), // Clean up any extra spaces
      bestScore: parseFloat(row?.best) || 0,           // Use parseFloat for decimal numbers
      averageScore: parseFloat(row?.average) || 0
    }));
    
    console.log('Transformed chart data:', chartData);
    
    // Return default data if no results to help with debugging
    if (chartData.length === 0) {
      console.log('No chart data found, returning default data for debugging');
      const defaultData = [
        { type: 'Wave', bestScore: 0, averageScore: 0 },
        { type: 'Forward Loop', bestScore: 0, averageScore: 0 }
      ];
      return NextResponse.json(defaultData);
    }
    
    return NextResponse.json(chartData);
    
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chart data', details: error.message },
      { status: 500 }
    );
  }
}