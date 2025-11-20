# 🚀 Quick Start Guide

## Prerequisites
- Node.js v16+
- MongoDB

## Installation

```bash
npm install
```

## Start Platform

```bash
# 1. Start MongoDB (Windows - as Administrator)
net start MongoDB

# 2. Start all services
npm start
```

## Access

- **Main App**: http://localhost:8800
- **Admin Panel**: http://localhost:9000 (admin/admin)

## Add Test Rewards

```bash
npm run add-rewards
```

## Troubleshooting

### MongoDB not starting
```bash
net start MongoDB
```

### Port already in use
```bash
# Find process
netstat -ano | findstr ":5001"

# Kill process (as Administrator)
taskkill /F /PID <PID>
```

### Network Error
- Check MongoDB is running
- Wait for "webpack compiled"
- Refresh browser (Ctrl+F5)

## Documentation

See **README.md** for complete documentation.
