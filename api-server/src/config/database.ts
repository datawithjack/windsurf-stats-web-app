import mysql from 'mysql2/promise';
import { DatabaseConfig } from '../types';

// Database configuration
export const dbConfig: DatabaseConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'jfa_heatwave_db',
};

// Create a connection pool for better performance
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper function to get a database connection
export async function getConnection() {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Unable to connect to database');
  }
}

// Helper function to execute queries with error handling
export async function executeQuery<T>(
  query: string, 
  params: (string | number)[] = []
): Promise<T[]> {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Health check function
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await executeQuery('SELECT 1 as health_check');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}