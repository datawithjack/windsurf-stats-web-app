import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');
  
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    let query = `
      SELECT
        PHD.heat_data_id,
        PHD.category_code, 
        PHD.heatsheet_id, 
        PHD.heat_id, 
        PHD.heat_no, 
        PHD.wave_count, 
        PHD.jumps_count, 
        PHD.wave_factor, 
        PHD.jump_factor, 
        PHD.sailor_name, 
        PHD.sail_number, 
        PHD.total_wave, 
        PHD.total_jump, 
        PHD.total_points,
        PEC.event_name,
        PEC.event_id,
        PHD.score_type,
        PHD.score
      FROM PWA_HEAT_DATA AS PHD
      LEFT JOIN PWA_EVENT_CATEGORIES AS PEC ON PHD.category_code = PEC.category_code
    `;
    
    const params: any[] = [];
    
    // Add event filtering when eventId is provided
    if (eventId) {
      query += ' WHERE PEC.event_id = ?';
      params.push(eventId);
    }
    
    query += ' ORDER BY PHD.total_points DESC';

    console.log('=== EXECUTING QUERY ===', query);
    console.log('=== WITH PARAMS ===', params);

    const [rows] = await connection.execute(query, params);

    console.log('=== ROWS RETURNED ===', Array.isArray(rows) ? rows.length : 0);
    if (Array.isArray(rows) && rows.length > 0) {
      console.log('=== FIRST ROW SAMPLE ===', JSON.stringify(rows[0], null, 2));
    }
    
    return NextResponse.json(rows || []);
  } catch (err) {
    console.error('Error fetching heat data:', err);
    return NextResponse.json([], { status: 200 });
  } finally {
    if (connection) await connection.end();
  }
} 