#!/bin/bash

# Windsurf Stats API - Oracle VM Deployment Script
# Run this script on your Oracle VM to deploy the API server

set -e  # Exit on any error

echo "🚀 Starting Windsurf Stats API deployment..."

# Configuration
API_DIR="/opt/windsurf-stats-api"
SERVICE_USER="windsurf-api"
SERVICE_NAME="windsurf-api"
API_PORT="3001"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

print_status "Creating service user..."
if ! id "$SERVICE_USER" &>/dev/null; then
    useradd -r -s /bin/false -d $API_DIR $SERVICE_USER
    print_status "Created user: $SERVICE_USER"
else
    print_status "User $SERVICE_USER already exists"
fi

print_status "Creating application directory..."
mkdir -p $API_DIR
cd $API_DIR

print_status "Installing Node.js and npm..."
# Update package list
apt update

# Install Node.js (using NodeSource repository for latest LTS)
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
    apt-get install -y nodejs
fi

# Verify Node.js installation
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
print_status "Node.js version: $NODE_VERSION"
print_status "npm version: $NPM_VERSION"

print_status "Installing PM2 globally..."
npm install -g pm2

print_status "Setting up application files..."
# If files were uploaded via scp, they should be in current directory
# Otherwise, you need to upload the api-server files first

if [ ! -f "package.json" ]; then
    print_error "package.json not found in $API_DIR"
    print_error "Please upload your api-server files to $API_DIR first"
    print_error "Example: scp -r api-server/* user@your-vm:$API_DIR/"
    exit 1
fi

print_status "Installing dependencies..."
npm ci --production

print_status "Creating logs directory..."
mkdir -p logs

print_status "Setting up environment file..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    print_warning "Created .env file from example. Please edit it with your configuration:"
    print_warning "  Database credentials"
    print_warning "  Allowed CORS origins"
    print_warning "  Rate limiting settings"
fi

print_status "Building application..."
npm run build

print_status "Setting up file permissions..."
chown -R $SERVICE_USER:$SERVICE_USER $API_DIR
chmod -R 750 $API_DIR

print_status "Configuring firewall..."
# Open API port
if command -v ufw &> /dev/null; then
    ufw allow $API_PORT/tcp comment "Windsurf Stats API"
    print_status "Opened port $API_PORT in firewall"
else
    print_warning "UFW not found. Manually configure firewall to allow port $API_PORT"
fi

print_status "Creating systemd service..."
cat > /etc/systemd/system/$SERVICE_NAME.service << EOF
[Unit]
Description=Windsurf Stats API Server
After=network.target mysql.service

[Service]
Type=forking
User=$SERVICE_USER
WorkingDirectory=$API_DIR
ExecStart=/usr/bin/pm2 start ecosystem.config.js --no-daemon
ExecReload=/usr/bin/pm2 reload all
ExecStop=/usr/bin/pm2 kill
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

print_status "Enabling and starting service..."
systemctl daemon-reload
systemctl enable $SERVICE_NAME

# Start the service as the service user
print_status "Starting API server with PM2..."
sudo -u $SERVICE_USER bash -c "cd $API_DIR && pm2 start ecosystem.config.js"

# Save PM2 configuration
sudo -u $SERVICE_USER bash -c "cd $API_DIR && pm2 save"
sudo -u $SERVICE_USER bash -c "cd $API_DIR && pm2 startup"

systemctl start $SERVICE_NAME

# Wait a moment for service to start
sleep 5

# Check service status
if systemctl is-active --quiet $SERVICE_NAME; then
    print_status "✅ Service is running!"
else
    print_error "❌ Service failed to start"
    systemctl status $SERVICE_NAME
    exit 1
fi

# Test the API
print_status "Testing API health endpoint..."
if curl -f http://localhost:$API_PORT/api/health > /dev/null 2>&1; then
    print_status "✅ API health check passed!"
else
    print_warning "⚠️  API health check failed. Check logs:"
    print_warning "  sudo -u $SERVICE_USER pm2 logs"
fi

print_status "🎉 Deployment completed!"
echo
echo "📋 Next steps:"
echo "1. Edit $API_DIR/.env with your database credentials"
echo "2. Restart the service: systemctl restart $SERVICE_NAME"
echo "3. Check logs: sudo -u $SERVICE_USER pm2 logs"
echo "4. Test API: curl http://your-vm-ip:$API_PORT/api/health"
echo "5. Update your Vercel app's API_BASE_URL to: https://your-vm-ip:$API_PORT"
echo
echo "📊 Service management:"
echo "  Status: systemctl status $SERVICE_NAME"
echo "  Stop:   systemctl stop $SERVICE_NAME"
echo "  Start:  systemctl start $SERVICE_NAME"
echo "  Logs:   sudo -u $SERVICE_USER pm2 logs"