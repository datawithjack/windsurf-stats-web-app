# Oracle VM Deployment Guide

Complete guide for deploying the Windsurf Stats API server to your Oracle VM.

## Prerequisites

- Oracle VM with Ubuntu/Debian OS
- SSH access to the VM
- MySQL database running and accessible
- Domain name or static IP (recommended)

## Deployment Steps

### 1. Upload Files to Oracle VM

From your local machine, upload the API server files:

```bash
# Option A: Upload entire api-server directory
scp -r api-server/ user@your-vm-ip:/opt/windsurf-stats-api/

# Option B: Create tarball and upload
cd windsurf-stats-web
tar -czf windsurf-api.tar.gz api-server/
scp windsurf-api.tar.gz user@your-vm-ip:/tmp/

# Then on VM:
ssh user@your-vm-ip
sudo mkdir -p /opt/windsurf-stats-api
cd /opt/windsurf-stats-api
sudo tar -xzf /tmp/windsurf-api.tar.gz --strip-components=1
```

### 2. Run Deployment Script

SSH into your Oracle VM and run the deployment script:

```bash
ssh user@your-vm-ip
cd /opt/windsurf-stats-api
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

The script will automatically:
- ✅ Install Node.js and npm
- ✅ Create service user and directories
- ✅ Install dependencies
- ✅ Build the application
- ✅ Configure firewall
- ✅ Create systemd service
- ✅ Start the API server

### 3. Configure Environment

Edit the environment file with your database credentials:

```bash
sudo nano /opt/windsurf-stats-api/.env
```

Required settings:
```env
# Database Configuration
MYSQL_HOST=localhost  # or your MySQL server IP
MYSQL_PORT=3306
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
MYSQL_DATABASE=jfa_heatwave_db

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS - Add your Vercel app domain
ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-custom-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100   # requests per window
```

### 4. Restart Service

After updating the environment:

```bash
sudo systemctl restart windsurf-api
```

### 5. Verify Deployment

Check service status:
```bash
sudo systemctl status windsurf-api
```

Test the API:
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "success",
  "data": {
    "server": "healthy",
    "database": "connected",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 123.45,
    "environment": "production"
  }
}
```

### 6. Test All Endpoints

```bash
# Test athlete filters
curl http://localhost:3001/api/athlete-filters

# Test athlete results
curl "http://localhost:3001/api/athlete-profile-results?athlete=John%20Doe"

# Test calendar
curl http://localhost:3001/api/calendar
```

## SSL/HTTPS Setup (Recommended)

### Option A: Let's Encrypt with Nginx

1. **Install Nginx and Certbot:**
```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

2. **Configure Nginx reverse proxy:**
```bash
sudo nano /etc/nginx/sites-available/windsurf-api
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable site and get SSL:**
```bash
sudo ln -s /etc/nginx/sites-available/windsurf-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d your-domain.com
```

### Option B: Direct SSL (if you have certificates)

Update your API server to handle HTTPS directly by modifying `src/server.ts`:

```typescript
import https from 'https';
import fs from 'fs';

// ... existing code ...

const options = {
  key: fs.readFileSync('/path/to/private-key.pem'),
  cert: fs.readFileSync('/path/to/certificate.pem')
};

https.createServer(options, app).listen(3001, () => {
  console.log('🚀 HTTPS API server running on port 3001');
});
```

## Monitoring & Maintenance

### Service Management

```bash
# Check status
sudo systemctl status windsurf-api

# Start/Stop/Restart
sudo systemctl start windsurf-api
sudo systemctl stop windsurf-api
sudo systemctl restart windsurf-api

# View logs
sudo -u windsurf-api pm2 logs
sudo -u windsurf-api pm2 status
```

### Log Management

Set up log rotation to prevent disk space issues:

```bash
sudo nano /etc/logrotate.d/windsurf-api
```

```
/opt/windsurf-stats-api/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    copytruncate
    postrotate
        sudo -u windsurf-api pm2 reloadLogs
    endscript
}
```

### Backup Strategy

Create backup script for your API configuration:

```bash
#!/bin/bash
# backup-api.sh
BACKUP_DIR="/opt/backups/windsurf-api"
mkdir -p $BACKUP_DIR

# Backup configuration
cp /opt/windsurf-stats-api/.env $BACKUP_DIR/.env.$(date +%Y%m%d)
cp /opt/windsurf-stats-api/ecosystem.config.js $BACKUP_DIR/ecosystem.config.js.$(date +%Y%m%d)

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.env.*" -mtime +7 -delete
find $BACKUP_DIR -name "*.config.js.*" -mtime +7 -delete
```

## Update Next.js Application

Update your Next.js app to use the deployed API:

### 1. Update Environment Variables

In your Vercel deployment settings, add:

```env
API_BASE_URL=https://your-domain.com
NEXT_PUBLIC_API_BASE_URL=https://your-domain.com
```

### 2. Deploy to Vercel

```bash
# Your Next.js app should now work with the remote API
vercel deploy --prod
```

## Troubleshooting

### Common Issues

**1. Service Won't Start**
```bash
# Check logs
sudo -u windsurf-api pm2 logs
sudo journalctl -u windsurf-api -f

# Common causes:
# - Database connection issues
# - Port already in use
# - Permission problems
```

**2. Database Connection Failed**
```bash
# Test MySQL connection
mysql -h localhost -u your_user -p your_database

# Check if MySQL is running
sudo systemctl status mysql

# Verify user permissions
mysql -u root -p
SHOW GRANTS FOR 'your_user'@'localhost';
```

**3. CORS Errors**
```bash
# Check ALLOWED_ORIGINS in .env
sudo nano /opt/windsurf-stats-api/.env

# Restart after changes
sudo systemctl restart windsurf-api
```

**4. Port Access Issues**
```bash
# Check if port is open
sudo netstat -tlnp | grep :3001

# Check firewall
sudo ufw status
sudo ufw allow 3001/tcp
```

**5. Memory/Performance Issues**
```bash
# Monitor resources
htop
sudo -u windsurf-api pm2 monit

# Restart if needed
sudo systemctl restart windsurf-api
```

### Health Monitoring

Set up a simple health check cron job:

```bash
# Add to crontab: crontab -e
*/5 * * * * curl -f http://localhost:3001/api/health > /dev/null 2>&1 || systemctl restart windsurf-api
```

## Security Considerations

1. **Firewall Configuration**
   - Only open necessary ports
   - Use fail2ban for SSH protection

2. **Regular Updates**
   ```bash
   sudo apt update && sudo apt upgrade
   npm audit fix
   ```

3. **User Permissions**
   - API runs as dedicated user
   - Minimal file permissions

4. **Rate Limiting**
   - Configured in .env
   - Monitor for abuse

5. **Database Security**
   - Use dedicated database user
   - Limit database permissions
   - Regular backups

## Support

If you encounter issues:

1. **Check logs:** `sudo -u windsurf-api pm2 logs`
2. **Test health:** `curl http://localhost:3001/api/health`
3. **Verify database:** Connect manually with mysql client
4. **Check service:** `sudo systemctl status windsurf-api`
5. **Review CORS:** Ensure domains are correctly configured