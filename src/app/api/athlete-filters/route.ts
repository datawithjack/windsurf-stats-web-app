import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'jfa_heatwave_db',
    });

    // Get distinct athletes
    const [athletes] = await connection.execute(`
      SELECT DISTINCT sailor_name as athlete_name 
      FROM athlete_profile_results 
      WHERE sailor_name IS NOT NULL 
      ORDER BY sailor_name
    `);

    // Get distinct years
    const [years] = await connection.execute(`
      SELECT DISTINCT year 
      FROM athlete_profile_results 
      WHERE year IS NOT NULL 
      ORDER BY year DESC
    `);

    console.log('=== ATHLETES RETURNED ===', Array.isArray(athletes) ? athletes.length : 0);
    console.log('=== YEARS RETURNED ===', Array.isArray(years) ? years.length : 0);
    
    return NextResponse.json({
      athletes: athletes || [],
      years: years || []
    });
  } catch (err) {
    console.error('Error fetching athlete filters:', err);
    return NextResponse.json({ athletes: [], years: [] }, { status: 200 });
  } finally {
    if (connection) await connection.end();
  }
} 