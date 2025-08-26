import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'jfa_heatwave_db',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');
  const gender = searchParams.get('gender');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    let query = `
      SELECT 
        Heat_No as heatNo,
        Athlete as athlete, 
        Total_Points as totalPoints, 
        Wave_Points as wavePoints, 
        Jump_Points as jumpPoints
      FROM view_heat_totals 
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (eventId) {
      query += ` AND event_id = ?`;
      params.push(eventId);
    }
    
    if (gender) {
      query += ` AND gender = ?`;
      params.push(gender);
    }
    
    query += ` ORDER BY Total_Points DESC`;
    
    console.log('Executing query:', query);
    console.log('With params:', params);
    
    const [rows] = await connection.execute(query, params);
    await connection.end();
    
    console.log('Query results:', rows);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}