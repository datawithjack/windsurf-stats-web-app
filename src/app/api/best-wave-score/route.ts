import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

interface WaveScoreResult {
  score: number;
  sailor_name: string;
  heat_no: string;
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
    
    // Use the exact query format for best wave score with event_id in main query
    const query = `
      SELECT Heat_No as heat_no, Athlete as sailor_name, Type as score_type, Score as score
      FROM view_heat_scores
      WHERE score = (
        SELECT MAX(Score)
        FROM view_heat_scores
        WHERE Gender = ? AND event_id = ? AND Type = 'Wave' AND Counting = 'Yes'
      ) AND Gender = ? AND Type = 'Wave' AND Counting = 'Yes' AND event_id = ?
    `;
    
    const queryParams: (string | number)[] = [];
    
    // Add parameters for subquery and main query
    queryParams.push(gender || 'Men');           // For subquery gender
    queryParams.push(parseInt(eventId || '374') || 374);  // For subquery event_id
    queryParams.push(gender || 'Men');           // For main query gender filter
    queryParams.push(parseInt(eventId || '374') || 374);  // For main query event_id filter
    
    console.log('Executing best wave score query:', query, 'with params:', queryParams);
    
    const [rows] = await connection.execute(query, queryParams);
    await connection.end();
    
    const results = Array.isArray(rows) ? rows as WaveScoreResult[] : [];
    console.log('Best wave score results:', results);
    
    if (results.length === 0) {
      return NextResponse.json({
        score: 0,
        subtitle: '- Heat',
        isMultiple: false
      });
    }
    
    const bestScore = results[0]?.score || 0;
    
    if (results.length === 1) {
      return NextResponse.json({
        score: bestScore,
        subtitle: `${results[0]?.sailor_name} - Heat ${results[0]?.heat_no}`,
        isMultiple: false
      });
    } else {
      return NextResponse.json({
        score: bestScore,
        subtitle: 'Multiple',
        isMultiple: true
      });
    }
    
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch best wave score', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}