"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const security_1 = require("./middleware/security");
// Import route handlers (will be created next)
const athlete_profile_results_1 = __importDefault(require("./routes/athlete-profile-results"));
const athlete_filters_1 = __importDefault(require("./routes/athlete-filters"));
const calendar_1 = __importDefault(require("./routes/calendar"));
const heat_data_1 = __importDefault(require("./routes/heat-data"));
const heatsheets_1 = __importDefault(require("./routes/heatsheets"));
const best_heat_scores_1 = __importDefault(require("./routes/best-heat-scores"));
const best_jumps_waves_1 = __importDefault(require("./routes/best-jumps-waves"));
const rider_counts_1 = __importDefault(require("./routes/rider-counts"));
const chart_data_1 = __importDefault(require("./routes/chart-data"));
const best_wave_score_1 = __importDefault(require("./routes/best-wave-score"));
const best_jump_score_1 = __importDefault(require("./routes/best-jump-score"));
const best_heat_score_1 = __importDefault(require("./routes/best-heat-score"));
const event_results_1 = __importDefault(require("./routes/event-results"));
const rider_count_1 = __importDefault(require("./routes/rider-count"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Apply security middleware
security_1.securityMiddleware.forEach(middleware => app.use(middleware));
// Request logging
app.use(security_1.requestLogger);
// Parse JSON requests
app.use(express_1.default.json());
// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        const dbHealthy = await (0, database_1.checkDatabaseHealth)();
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
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            error: 'Health check failed',
            data: null
        });
    }
});
// API routes - matching the existing Next.js structure
app.use('/api/athlete-profile-results', athlete_profile_results_1.default);
app.use('/api/athlete-filters', athlete_filters_1.default);
app.use('/api/calendar', calendar_1.default);
app.use('/api/heat-data', heat_data_1.default);
app.use('/api/heatsheets', heatsheets_1.default);
app.use('/api/best-heat-scores', best_heat_scores_1.default);
app.use('/api/best-jumps-waves', best_jumps_waves_1.default);
app.use('/api/rider-counts', rider_counts_1.default);
app.use('/api/chart-data', chart_data_1.default);
app.use('/api/best-wave-score', best_wave_score_1.default);
app.use('/api/best-jump-score', best_jump_score_1.default);
app.use('/api/best-heat-score', best_heat_score_1.default);
app.use('/api/event-results', event_results_1.default);
app.use('/api/rider-count', rider_count_1.default);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        error: 'Endpoint not found',
        data: null
    });
});
// Error handling middleware (must be last)
app.use(security_1.errorHandler);
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Windsurf Stats API server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    // Test database connection on startup
    (0, database_1.checkDatabaseHealth)()
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
//# sourceMappingURL=server.js.map