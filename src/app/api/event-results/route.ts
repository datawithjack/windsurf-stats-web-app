import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

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
    
    let query = 'SELECT Position, Rider, Sponsors FROM view_event_results';
    let queryParams: any[] = [];
    let whereConditions: string[] = [];
    
    if (eventId) {
      whereConditions.push('event_id = ?');
      queryParams.push(eventId);
    }
    
    if (gender) {
      whereConditions.push('Gender = ?');
      queryParams.push(gender);
    }
    
    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    query += ' ORDER BY Position ASC';
    
    console.log('Executing query:', query, 'with params:', queryParams);
    
    const [rows] = await connection.execute(query, queryParams);
    await connection.end();
    
    console.log('Query result:', rows);
    
    // Ensure we return an array
    const results = Array.isArray(rows) ? rows : [];
    return NextResponse.json(results);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event results', details: error.message },
      { status: 500 }
    );
  }
}