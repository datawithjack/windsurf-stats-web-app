import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'jfa_heatwave_db',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('event_id');
    
    await connection;
    
    let query = `
      SELECT 
        event_id,
        discipline AS gender,
        COUNT(DISTINCT sailor_href) as total
      FROM PWA_EVENT_RESULTS
    `;
    
    const params: any[] = [];
    
    if (eventId) {
      query += ' WHERE event_id = ?';
      params.push(eventId);
    }
    
    query += ' GROUP BY event_id, discipline';
    
    const [rows] = await (await connection).execute(query, params);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rider counts' },
      { status: 500 }
    );
  }
}