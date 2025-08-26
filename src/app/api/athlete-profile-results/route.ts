import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const athlete = searchParams.get('athlete');
  const year = searchParams.get('year');
  
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'jfa_heatwave_db',
    });

    let query = `
      SELECT *
      FROM athlete_profile_results
    `;
    
    const params: any[] = [];
    const conditions: string[] = [];
    
    // Add athlete filtering when athlete is provided
    if (athlete) {
      conditions.push('sailor_name = ?');
      params.push(athlete);
    }
    
    // Add year filtering when year is provided
    if (year) {
      conditions.push('year = ?');
      params.push(year);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY start_date DESC';

    console.log('=== EXECUTING ATHLETE PROFILE QUERY ===', query);
    console.log('=== WITH PARAMS ===', params);

    const [rows] = await connection.execute(query, params);

    console.log('=== ROWS RETURNED ===', Array.isArray(rows) ? rows.length : 0);
    if (Array.isArray(rows) && rows.length > 0) {
      console.log('=== FIRST ROW SAMPLE ===', JSON.stringify(rows[0], null, 2));
    }
    
    return NextResponse.json(rows || []);
  } catch (err) {
    console.error('Error fetching athlete profile results:', err);
    return NextResponse.json([], { status: 200 });
  } finally {
    if (connection) await connection.end();
  }
} 