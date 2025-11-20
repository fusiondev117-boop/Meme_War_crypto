# 🚀 Quick Setup Guide

## Prerequisites

- **Node.js** v16+ installed
- **MongoDB** running (locally or cloud)

## Installation

```bash
npm install
```

This will automatically install dependencies for:
- Backend (with `--ignore-scripts` to skip native builds)
- Frontend (with `--legacy-peer-deps` for compatibility)
- Admin Panel (with `--legacy-peer-deps` for compatibility)

## Configuration

### 1. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Windows: https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string

### 2. Backend Configuration

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/crypto-gamefi
JWT_SECRET=your_secret_key_here
SERVER_PORT=5000
```

Or copy the example:
```bash
cp .env.example backend/.env
# Then edit backend/.env with your values
```

## Running the Project

```bash
npm start
```

This single command starts all three services:
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:8800
- **Admin Panel**: http://localhost:9000

## Troubleshooting

### MongoDB Connection Error
If you see `connect ETIMEDOUT` or MongoDB errors:
1. Make sure MongoDB is running
2. Check your `MONGODB_URI` in `backend/.env`
3. For local MongoDB, use: `mongodb://localhost:27017/crypto-gamefi`

### Port Already in Use
If ports 5000, 8800, or 9000 are in use:
1. Stop other services using those ports
2. Or change ports in configuration files

### Google OAuth Errors
The "Missing required parameter client_id" error is normal if you haven't configured Google OAuth. The app will still work without it.

## Development

### Run Individual Services

```bash
# Backend only
cd backend && npm start

# Frontend only  
cd frontend && npm start

# Admin only
cd admin && npm start
```

### Run Game Microservices

```bash
cd backend

# Individual games
npm run scissors    # Port 5200
npm run crash       # Port 5700
npm run mines       # Port 5300
npm run dice        # Port 5400
npm run slot        # Port 5500
npm run plinko      # Port 5600
npm run turtle      # Port 5100

# Other services
npm run chatroom    # Port 4900
npm run manage      # Port 4000
npm run admin       # Port 6100
```

## Next Steps

1. Configure your MongoDB connection
2. Run `npm start`
3. Open http://localhost:8800 in your browser
4. Start building!

For more details, see the main [README.md](README.md)
