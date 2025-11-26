# Troubleshooting Guide

## Common Issues and Solutions

### 1. bcrypt Module Error

**Error:** `Cannot find module 'bcrypt_lib.node'`

**Cause:** Native modules like bcrypt need to be compiled for your specific Node.js version.

**Solution:**
```bash
# Automatic fix (recommended)
npm run rebuild-native

# Or manually in backend directory
cd backend
npm rebuild bcrypt
```

**Prevention:** The postinstall script now automatically rebuilds bcrypt after `npm install`.

---

### 2. MongoDB Connection Failed

**Error:** `MongoDB connection failed` or Backend API exits with code 1

**Cause:** MongoDB is not running.

**Solutions:**

**Windows:**
```cmd
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Docker:**
```bash
docker start mongodb
# Or if not created yet:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

### 3. Port Already in Use

**Error:** `EADDRINUSE: address already in use`

**Solution:**
```cmd
# Windows - Find and kill process on port (e.g., 5001)
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Or restart your computer
```

---

### 4. Source Map Warnings

**Warning:** `Failed to parse source map from...`

**Cause:** Missing TypeScript source files in node_modules (normal for npm packages).

**Solution:** These are safe to ignore. To suppress them, add to `.env` files:
```
GENERATE_SOURCEMAP=false
```

---

### 5. Node Version Issues

**Recommended:** Node.js v16.x - v20.x (LTS versions)

**Current Support:** v16.0.0 - v25.x

If using Node.js v25+, native modules will be automatically rebuilt during installation.

---

### 6. Fresh Install

If you encounter persistent issues, try a clean reinstall:

```bash
# Clean everything
npm run cleanup

# Reinstall all dependencies
npm run install-all

# Native modules will rebuild automatically
```

---

## Quick Checks

```bash
# Verify all services are configured correctly
npm run check

# Check if MongoDB is running
# Windows:
sc query MongoDB

# Test backend connection
curl http://localhost:5001/health
```

---

## Getting Help

1. Check this troubleshooting guide first
2. Review `QUICK_START.md` for setup instructions
3. Ensure all prerequisites are installed (Node.js, MongoDB, npm)
4. Check the logs in `backend/logs/` directory
