import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const [rows] = await connection.execute(`
      SELECT
        heatsheet_id,
        category_code,
        heat_id,
        heat_no,
        sailor_name,
        sail_number,
        country,
        rank,
        status
      FROM PWA_HEATSHEETS
      ORDER BY category_code, heat_no, rank
    `);

    return NextResponse.json(rows || []);
  } catch (err) {
    console.error('Error fetching heatsheet data:', err);
    return NextResponse.json([], { status: 200 });
  } finally {
    if (connection) await connection.end();
  }
} 