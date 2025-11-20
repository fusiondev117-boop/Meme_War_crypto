# 🚀 How to Start - Visual Guide

## 🎯 The Easiest Way (3 Steps)

### Step 1️⃣: Find the File
Look for this file in your project folder:
```
📁 Meme-War/
  📄 START_HERE.bat  ← This one!
```

### Step 2️⃣: Run as Administrator
**Right-click** on `START_HERE.bat` → Select **"Run as administrator"**

![Run as Admin](https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Right+Click+%E2%86%92+Run+as+Administrator)

### Step 3️⃣: Wait and Open Browser
- Wait 30-60 seconds for compilation
- When you see "webpack compiled", open your browser
- Go to: **http://localhost:8800**

---

## 🖥️ What You'll See

### In the Console:
```
╔═══════════════════════════════════════════════════════════════╗
║         CRYPTO GAMEFI - AUTOMATED STARTUP                     ║
╚═══════════════════════════════════════════════════════════════╝

[✓] Running with Administrator privileges
[✓] MongoDB started successfully
[✓] Port cleanup complete

Starting services now...

[BACKEND] server connected to mongodb successfully
[BACKEND] server started on 5001 port
[ADMIN-API] Admin Server starting on 6100
[FRONTEND] webpack compiled with 81 warnings
[ADMIN-UI] webpack compiled successfully
```

### In Your Browser:
1. **Main App** (http://localhost:8800)
   - Gaming platform with all games
   - User registration and login
   - Wallet integration

2. **Admin Panel** (http://localhost:9000)
   - Login: `admin` / `admin`
   - User management
   - Game statistics
   - Transaction monitoring

---

## 🔧 If Something Goes Wrong

### Problem: "MongoDB failed to start"
**Solution:**
```bash
# Open Command Prompt as Administrator
net start MongoDB
```

Or:
1. Press `Win + R`
2. Type `services.msc`
3. Find "MongoDB" service
4. Right-click → Start

### Problem: "Port already in use"
**Solution:**
The script should handle this automatically. If not:
```bash
# Run this as Administrator
start-clean.bat
```

### Problem: "Network Error" in browser
**Solution:**
1. Check the console for errors
2. Make sure you see "server started on 5001 port"
3. Make sure you see "Admin Server starting on 6100"
4. Refresh your browser

---

## 📊 Service Status Check

After starting, you should see these services running:

| ✅ Service | Port | Status Check |
|-----------|------|--------------|
| Backend API | 5001 | http://localhost:5001 |
| Frontend | 8800 | http://localhost:8800 |
| Admin UI | 9000 | http://localhost:9000 |
| Admin API | 6100 | http://localhost:6100/admin |

---

## 🎮 Testing the Platform

### 1. Create an Account
- Go to http://localhost:8800
- Click "Register" or "Sign Up"
- Fill in your details
- Login

### 2. Try a Game
- Click on any game (Dice, Mines, Crash, etc.)
- Place a bet
- Play!

### 3. Access Admin Panel
- Go to http://localhost:9000
- Login: `admin` / `admin`
- View users, games, transactions

---

## 🛑 How to Stop

Press `Ctrl + C` in the console window, then press `Y` to confirm.

Or simply close the console window.

---

## 📚 More Information

- **Quick Reference**: See `QUICK_START.txt`
- **Detailed Guide**: See `START_PROJECT.md`
- **Full Documentation**: See `README.md`
- **What Was Fixed**: See `SETUP_COMPLETE.md`

---

## 🎉 You're Ready!

Just run `START_HERE.bat` as Administrator and you're good to go!

**Main App**: http://localhost:8800  
**Admin Panel**: http://localhost:9000 (admin/admin)

Enjoy your Crypto GameFi platform! 🎰🎮
