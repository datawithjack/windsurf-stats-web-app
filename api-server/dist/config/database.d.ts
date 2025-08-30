import mysql from 'mysql2/promise';
import { DatabaseConfig } from '../types';
export declare const dbConfig: DatabaseConfig;
export declare const pool: mysql.Pool;
export declare function getConnection(): Promise<mysql.PoolConnection>;
export declare function executeQuery<T>(query: string, params?: (string | number)[]): Promise<T[]>;
export declare function checkDatabaseHealth(): Promise<boolean>;
//# sourceMappingURL=database.d.ts.map