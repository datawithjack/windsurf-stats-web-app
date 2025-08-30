# Windsurf Stats API Server

Standalone Express.js API server for windsurf statistics data, designed to work with Vercel-deployed Next.js applications.

## Features

- **Express.js + TypeScript** - Fast, type-safe API server
- **MySQL Connection Pooling** - Optimized database connections
- **CORS Security** - Configurable cross-origin protection
- **Rate Limiting** - Protection against API abuse
- **Health Monitoring** - Built-in health check endpoints
- **PM2 Support** - Production process management

## Quick Start

### 1. Install Dependencies

```bash
cd api-server
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=jfa_heatwave_db

# API Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration  
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:3000
```

### 3. Development Mode

```bash
npm run dev
```

Server will start on `http://localhost:3001`

### 4. Production Build & Deploy

```bash
# Build TypeScript
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm run pm2:start
```

## API Endpoints

All endpoints return JSON with this format:

```json
{
  "status": "success" | "error",
  "data": any,
  "error": string | undefined
}
```

### Core Endpoints

- `GET /api/health` - Health check and database status
- `GET /api/athlete-profile-results` - Athlete competition results
- `GET /api/athlete-filters` - Available athletes and years for filtering
- `GET /api/calendar` - Event calendar data
- `GET /api/heat-data` - Detailed heat competition data

### Statistics Endpoints  

- `GET /api/best-heat-scores` - Best heat scores by athlete
- `GET /api/best-jumps-waves` - Best jump and wave scores
- `GET /api/best-wave-score` - Individual best wave scores
- `GET /api/best-jump-score` - Individual best jump scores
- `GET /api/best-heat-score` - Individual best heat scores

### Event Endpoints

- `GET /api/event-results` - Results for specific events
- `GET /api/heatsheets` - Heat sheet information
- `GET /api/rider-counts` - Rider counts by event
- `GET /api/rider-count` - Single event rider count
- `GET /api/chart-data` - Generic chart data

## Query Parameters

Most endpoints support filtering:

- `?athlete=John Doe` - Filter by athlete name
- `?year=2024` - Filter by year
- `?eventId=123` - Filter by event ID

## Security Features

### CORS Protection
- Configurable allowed origins
- Credentials support
- Preflight handling

### Rate Limiting  
- 100 requests per 15 minutes per IP (configurable)
- Graceful rate limit responses
- Standard headers included

### Security Headers
- Helmet.js security headers
- Content Security Policy
- XSS protection

## Database Schema

Requires MySQL database with these main tables/views:

- `athlete_profile_results` - Main athlete results view
- `PWA_EVENT_CATEGORIES` - Event category information  
- `PWA_HEAT_DATA` - Detailed heat performance data
- `PWA_HEATSHEETS` - Heat sheet lineups
- `PWA_EVENT_RESULTS` - Event results data

## Monitoring

### Health Check
```bash
curl http://localhost:3001/api/health
```

Returns server status, database connectivity, and system info.

### Logs
- Request logging with duration tracking  
- Error logging with stack traces
- PM2 log management in production

### PM2 Process Management

```bash
# Start with PM2
npm run pm2:start

# Monitor processes  
pm2 status

# View logs
pm2 logs windsurf-api

# Restart
npm run pm2:restart

# Stop
npm run pm2:stop
```

## Deployment to Oracle VM

### 1. Upload Files
```bash
scp -r api-server/ user@your-vm:/path/to/deployment/
```

### 2. Install Dependencies
```bash
ssh user@your-vm
cd /path/to/deployment/api-server
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with production values
```

### 4. Build and Start
```bash
npm run build
npm run pm2:start
```

### 5. Configure Firewall
```bash
# Open port 3001
sudo ufw allow 3001

# Or use nginx reverse proxy (recommended)
sudo ufw allow 80
sudo ufw allow 443
```

## Integration with Next.js

Update your Next.js app to use HTTP calls instead of direct database connections:

```typescript
// In your Next.js API routes
const response = await fetch(`${process.env.API_BASE_URL}/api/athlete-profile-results?athlete=${athlete}`);
const data = await response.json();
```

Set environment variable in Next.js:
```env
API_BASE_URL=https://your-vm-ip:3001
```

## Production Considerations

### SSL/HTTPS
- Use Let's Encrypt for SSL certificates
- Configure nginx reverse proxy
- Update CORS origins for HTTPS

### Performance
- Connection pooling is configured (10 connections)
- Response compression enabled
- Consider Redis caching for frequently accessed data

### Monitoring
- Set up log rotation
- Monitor PM2 process health
- Consider uptime monitoring tools

## Troubleshooting

### Database Connection Issues
- Check `.env` configuration
- Verify MySQL server is running
- Test connection with mysql client

### CORS Errors
- Verify `ALLOWED_ORIGINS` in `.env`
- Check browser developer console
- Test with curl/Postman first

### Performance Issues  
- Monitor database connection pool usage
- Check slow query logs
- Consider adding database indexes

## Support

For issues or questions:
1. Check logs: `pm2 logs windsurf-api`
2. Test health endpoint: `curl /api/health`
3. Verify database connectivity
4. Review CORS configuration