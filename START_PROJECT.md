# Complete Project Startup Guide

## Prerequisites Check

### 1. MongoDB Service
MongoDB is installed but stopped. You need to start it with administrator privileges.

**Start MongoDB (Run as Administrator):**
```cmd
net start MongoDB
```

Or manually start the MongoDB service from Windows Services (services.msc).

### 2. Kill Existing Processes
Some ports are still in use from previous runs. Open Command Prompt as Administrator and run:

```cmd
netstat -ano | findstr ":5001"
netstat -ano | findstr ":5200"
netstat -ano | findstr ":5300"
netstat -ano | findstr ":5400"
netstat -ano | findstr ":5500"
netstat -ano | findstr ":5600"
netstat -ano | findstr ":5700"
```

For each PID found, kill it:
```cmd
taskkill /F /PID <PID_NUMBER>
```

## Quick Start (After Prerequisites)

1. **Start MongoDB** (if not running):
   ```cmd
   net start MongoDB
   ```

2. **Start All Services**:
   ```cmd
   npm start
   ```

## Services Overview

After running `npm start`, the following services will start:

| Service | Port | URL | Status |
|---------|------|-----|--------|
| Backend API | 5001 | http://localhost:5001/api | ✓ |
| Frontend | 8800 | http://localhost:8800 | ✓ |
| Admin Panel UI | 9000 | http://localhost:9000 | ✓ |
| Admin Backend API | 6100 | http://localhost:6100/admin | ✓ |
| Management Socket | 4000 | http://localhost:4000 | ✓ |
| Chat Socket | 4900 | http://localhost:4900 | ✓ |
| Turtle Race | 5100 | http://localhost:5100 | ✓ |
| Scissors Game | 5200 | http://localhost:5200 | ⚠️ |
| Mines Game | 5300 | http://localhost:5300 | ✓ |
| Dice Game | 5400 | http://localhost:5400 | ✓ |
| Slot Game | 5500 | http://localhost:5500 | ✓ |
| Plinko Game | 5600 | http://localhost:5600 | ✓ |
| Crash Game | 5700 | http://localhost:5700 | ✓ |

## Access Points

- **Main Application**: http://localhost:8800
- **Admin Panel**: http://localhost:9000
  - Default credentials: admin/admin

## Troubleshooting

### MongoDB Connection Error
If you see "mongodb connection error":
1. Ensure MongoDB service is running
2. Check connection string in `backend/.env`

### Port Already in Use
If you see "EADDRINUSE" errors:
1. Find the process: `netstat -ano | findstr ":<PORT>"`
2. Kill it: `taskkill /F /PID <PID>`

### Network Errors in Browser
If frontend shows "Network Error":
1. Check that backend is running on port 5001
2. Check browser console for specific endpoint errors
3. Verify MongoDB is connected

### Admin Panel Network Error
If admin panel shows "Network Error":
1. Check that Admin Backend API is running on port 6100
2. Look for "Admin Server starting on 6100" in console

## Configuration Files

- **Backend**: `backend/.env` - Port 5001, MongoDB connection
- **Frontend**: `frontend/src/config/baseConfig.js` - API endpoints
- **Admin**: `admin/src/config/baseConfig.js` - Admin API endpoints

## Notes

- The Scissors game service may fail if port 5200 is in use
- Tatum API errors (401) are expected with demo API keys - crypto features won't work
- Frontend/Admin will take 30-60 seconds to compile on first start
