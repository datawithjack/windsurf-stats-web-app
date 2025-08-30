import express from 'express';
import dotenv from 'dotenv';
import { checkDatabaseHealth } from './config/database';
import { securityMiddleware, requestLogger, errorHandler } from './middleware/security';

// Import route handlers (will be created next)
import athleteProfileResultsRoute from './routes/athlete-profile-results';
import athleteFiltersRoute from './routes/athlete-filters';
import calendarRoute from './routes/calendar';
import heatDataRoute from './routes/heat-data';
import heatsheetsRoute from './routes/heatsheets';
import bestHeatScoresRoute from './routes/best-heat-scores';
import bestJumpsWavesRoute from './routes/best-jumps-waves';
import riderCountsRoute from './routes/rider-counts';
import chartDataRoute from './routes/chart-data';
import bestWaveScoreRoute from './routes/best-wave-score';
import bestJumpScoreRoute from './routes/best-jump-score';
import bestHeatScoreRoute from './routes/best-heat-score';
import eventResultsRoute from './routes/event-results';
import riderCountRoute from './routes/rider-count';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Apply security middleware
securityMiddleware.forEach(middleware => app.use(middleware));

// Request logging
app.use(requestLogger);

// Parse JSON requests
app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbHealthy = await checkDatabaseHealth();
    
    res.json({
      status: 'success',
      data: {
        server: 'healthy',
        database: dbHealthy ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Health check failed',
      data: null
    });
  }
});

// API routes - matching the existing Next.js structure
app.use('/api/athlete-profile-results', athleteProfileResultsRoute);
app.use('/api/athlete-filters', athleteFiltersRoute);
app.use('/api/calendar', calendarRoute);
app.use('/api/heat-data', heatDataRoute);
app.use('/api/heatsheets', heatsheetsRoute);
app.use('/api/best-heat-scores', bestHeatScoresRoute);
app.use('/api/best-jumps-waves', bestJumpsWavesRoute);
app.use('/api/rider-counts', riderCountsRoute);
app.use('/api/chart-data', chartDataRoute);
app.use('/api/best-wave-score', bestWaveScoreRoute);
app.use('/api/best-jump-score', bestJumpScoreRoute);
app.use('/api/best-heat-score', bestHeatScoreRoute);
app.use('/api/event-results', eventResultsRoute);
app.use('/api/rider-count', riderCountRoute);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Endpoint not found',
    data: null
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Windsurf Stats API server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  
  // Test database connection on startup
  checkDatabaseHealth()
    .then(healthy => {
      console.log(`📊 Database: ${healthy ? '✅ Connected' : '❌ Disconnected'}`);
    })
    .catch(error => {
      console.error('❌ Database connection test failed:', error.message);
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});