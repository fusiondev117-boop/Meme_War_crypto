# Quick Start Guide - Node.js 25

## Prerequisites

- Node.js 25.x installed
- MongoDB running locally or accessible remotely
- Git (for cloning)

## Installation

```bash
# 1. Install all dependencies
npm run install-all
```

**Note:** You may see warnings about `node-hid` or other optional native modules failing to build. This is expected and safe to ignore - the application doesn't use these modules.

The installation will:
- Automatically install backend, frontend, and admin dependencies
- Skip optional native modules that require Visual Studio Build Tools (using `--no-optional` flag)
- Complete successfully even if you see build warnings

## Configuration

```bash
# 2. Copy environment file
cp backend/.env.example backend/.env

# 3. Edit backend/.env with your settings
# - MongoDB connection string
# - JWT secrets
# - API keys
```

## Start MongoDB

### Windows
```cmd
net start MongoDB
```

### macOS
```bash
brew services start mongodb-community
```

### Linux
```bash
sudo systemctl start mongod
```

### Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Run the Application

```bash
npm start
```

This will start:
- Backend API (http://localhost:5001)
- Frontend (http://localhost:8800)
- Admin Panel (http://localhost:9000)
- All game services

## Access

- **Frontend**: http://localhost:8800
- **Admin Panel**: http://localhost:9000 (default: admin/admin)
- **API**: http://localhost:5001/api

## Troubleshooting

### Installation warnings about node-hid
These are safe to ignore. The application doesn't use this optional dependency.

### MongoDB connection errors
Make sure MongoDB is running before starting the application.

### Port already in use
Check if another instance is running or change ports in .env files.

## Clean Install

If you need to start fresh:

```bash
npm run cleanup
npm install
```

## Development

Individual services can be started separately:

```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm start

# Admin only
cd admin && npm start
```

## Support

For detailed documentation, see:
- `README.md` - Full project documentation
- `NODE25_FIX.md` - Node.js 25 compatibility details
- `CHANGES.md` - List of all changes made
