"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.dbConfig = void 0;
exports.getConnection = getConnection;
exports.executeQuery = executeQuery;
exports.checkDatabaseHealth = checkDatabaseHealth;
const promise_1 = __importDefault(require("mysql2/promise"));
// Database configuration
exports.dbConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'jfa_heatwave_db',
};
// Create a connection pool for better performance
exports.pool = promise_1.default.createPool({
    ...exports.dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// Helper function to get a database connection
async function getConnection() {
    try {
        return await exports.pool.getConnection();
    }
    catch (error) {
        console.error('Database connection failed:', error);
        throw new Error('Unable to connect to database');
    }
}
// Helper function to execute queries with error handling
async function executeQuery(query, params = []) {
    let connection;
    try {
        connection = await getConnection();
        const [rows] = await connection.execute(query, params);
        return rows;
    }
    catch (error) {
        console.error('Query execution failed:', error);
        throw error;
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
}
// Health check function
async function checkDatabaseHealth() {
    try {
        await executeQuery('SELECT 1 as health_check');
        return true;
    }
    catch (error) {
        console.error('Database health check failed:', error);
        return false;
    }
}
//# sourceMappingURL=database.js.map