# 🎰 Crypto Meme War 🎮

**Scissors • Crash • Mines • Turtle • Plinko • Dice • Slot Game**

A modern crypto-powered gaming platform supporting multi-chain tokens and exciting on-chain games.

![Platform Preview](https://github.com/user-attachments/assets/a770c0e9-b45b-49f2-90a7-c215562f0b58)

---

## 🚀 NEW USERS: [START HERE →](START_HERE.md)

**First time setup?** Follow the [Quick Start Guide](START_HERE.md) (5 minutes)

**Need help?** See [Complete Setup Guide](SETUP_GUIDE.md) with troubleshooting

---

## 📋 Table of Contents

- [Games Included](#-games-included)
- [Supported Cryptocurrencies](#-supported-cryptocurrencies)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Add Test Rewards](#-add-test-rewards)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Troubleshooting](#-troubleshooting)
- [Security](#-security)
- [Tech Stack](#-tech-stack)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🕹️ Games Included

| Game               | Description                       | Preview                                                                                      |
| ------------------ | --------------------------------- | -------------------------------------------------------------------------------------------- |
| ✂️ **Scissors**    | Classic multiplayer hand game     | ![Scissors](https://github.com/user-attachments/assets/f75023fb-3788-40a6-ac73-adfa97c70a42) |
| 🚀 **Crash**       | Bet before the graph crashes!     | ![Crash](https://github.com/user-attachments/assets/aad8c424-e791-4326-97c0-38606ae89bc0)    |
| 💣 **Mines**       | Find safe spots, avoid bombs!     | ![Mines](https://github.com/user-attachments/assets/5890bc2d-23ac-4c3c-b402-19759c577507)    |
| 🐢 **Turtle Race** | Race to win in a thrilling format | ![Turtle](https://github.com/user-attachments/assets/5cd8b3c1-0f53-48c6-b660-0aba7836dc2f)   |
| 🎲 **Dice**        | Traditional luck-based dice game  | ![Dice](https://github.com/user-attachments/assets/b331fe0d-871a-4f4e-aea4-bf4a4cf6e74c)     |
| 🎰 **Slot**        | Spin the reels, win rewards!      | ![Slot](https://github.com/user-attachments/assets/b46a5c71-22cd-4ce7-b549-5fb451c31b87)     |
| 📊 **Plinko**      | Ball drop probability game        | Exciting risk/reward gameplay                                                                |

---

## 💰 Supported Cryptocurrencies

* ₿ **Bitcoin (BTC)**
* Ξ **Ethereum (ETH)**
* 🟡 **Binance Smart Chain (BSC)**
* 🔷 **Solana (SOL)**
* 💵 **USDT** (All major chains)
* $ **Abstract**

---

## 🏗️ Project Structure

### Frontend (Port: 8800)
* Game UI and wallet interactions
* Real-time Socket.IO updates
* User account dashboard

### Admin Panel (Port: 9000)
* Game & user management
* Live transaction monitoring
* Platform analytics

### Backend (Microservices)

| Service                    | Port | Description |
| -------------------------- | ---- | ----------- |
| Main Backend API           | 5001 | Core API, authentication, user management |
| Admin Backend API          | 6100 | Admin operations and analytics |
| Management Service         | 4000 | Game state coordination |
| Chat Service               | 4900 | Real-time chat |
| Turtle Race Game           | 5100 | Turtle race game logic |
| Scissors Game              | 5200 | Rock-paper-scissors game |
| Mines Game                 | 5300 | Minesweeper-style game |
| Dice Game                  | 5400 | Dice betting game |
| Slot Game                  | 5500 | Slot machine game |
| Plinko Game                | 5600 | Plinko probability game |
| Crash Game                 | 5700 | Multiplier crash game |

---

## 🚀 Quick Start

Please see QUICK_START.md

### Prerequisites

* **Node.js** v16+ - [Download](https://nodejs.org/)
* **MongoDB** - **REQUIRED** - [Installation Guide](INSTALL_MONGODB.md)
  - Local MongoDB, OR
  - MongoDB Atlas (Cloud - Free), OR
  - Docker MongoDB
* **Web3 Wallet** (MetaMask, TrustWallet, etc.) - Optional

### Installation

#### Step 1: Install MongoDB

**MongoDB is REQUIRED** - The platform cannot run without it.

**Quick Install:**
- **Windows**: Download from [MongoDB.com](https://www.mongodb.com/try/download/community) and install as a service
- **macOS**: `brew install mongodb-community && brew services start mongodb-community`
- **Linux**: See [INSTALL_MONGODB.md](INSTALL_MONGODB.md)
- **Docker**: `docker run -d -p 27017:27017 --name mongodb mongo:latest`
- **Cloud**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) (Free tier available)

**Detailed instructions**: See [INSTALL_MONGODB.md](INSTALL_MONGODB.md)

#### Step 2: Install Dependencies

```bash
# Install all dependencies (backend, frontend, and admin)
npm run install-all
```

#### Step 3: Configure Environment

```bash
# Copy example environment file
cp backend/.env.example backend/.env
```

Edit `backend/.env` and update:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/crypto-gamefi
JWT_SECRET=your_secure_secret_key
```

#### Step 4: Start MongoDB

```bash
# Windows (as Administrator)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Docker
docker start mongodb
```

### Step 5: Start the Platform

```bash
# Start everything with one command
npm start
```

**The script will:**
1. Check if MongoDB is running
2. Verify all dependencies are installed
3. Start ALL 13 services:
- Backend API (5001)
- Frontend (8800)
- Admin Panel UI (9000)
- Admin Backend API (6100)
- All 7 game services
- Management & Chat services

**Wait 30-60 seconds** for frontend/admin compilation to complete.

### Access Points

| Service | URL | Credentials |
|---------|-----|-------------|
| **Main App** | http://localhost:8800 | Register new account |
| **Admin Panel** | http://localhost:9000 | Username: `admin` / Password: `admin` |
| **Backend API** | http://localhost:5001/api | - |
| **Admin API** | http://localhost:6100/admin | - |

### Stop the Platform

Press `Ctrl + C` in the terminal where `npm start` is running. All services will stop automatically.

---

## ⚙️ Configuration

### Backend Configuration

1. Copy the example environment file:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. Edit `backend/.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/crypto-gamefi
   JWT_SECRET=crypto_gamefi_secret_key_2024
   SERVER_PORT=5001
   TATUM_API_KEY=your_tatum_api_key
   WEB3_PROVIDER=https://mainnet.infura.io/v3/your_infura_key
   ```

### Frontend Configuration (Optional)

For Google OAuth, create `frontend/.env`:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### Production Deployment

Update environment flags in config files:
- `frontend/src/config/baseConfig.js` - Set `isLocal = false`
- `admin/src/config/baseConfig.js` - Set `isLocal = false`

---

## 💰 Add Test Rewards

### Default Balance for New Users

New users automatically receive:
- **1000 ETH** - For playing games
- **100 BIC** - Platform currency

### Add More Test Rewards

To add 1000 of each currency to all users:

```bash
npm run add-rewards
```

This adds:
- 1000 BTC
- 1000 ETH
- 1000 USDT
- 1000 BSC
- 1000 TRX
- 1000 SOL

### Migrate Existing Users

If you have existing users created before the balance update, run:

```bash
npm run migrate-balances
```

This ensures all users have at least 1000 ETH and 100 BIC.

### Steps

1. **Register a user** at http://localhost:8800 (gets 1000 ETH + 100 BIC automatically)
2. **Optional**: Run `npm run add-rewards` for more currencies
3. **Refresh browser** (F5)
4. **Start playing!**

### Script Output Example

```
╔═══════════════════════════════════════════════════════════╗
║         ADD TEST REWARDS - 1000 Each Currency             ║
╚═══════════════════════════════════════════════════════════╝

✅ Connected to MongoDB
Found 1 user(s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 User: TestUser
   ID: 507f1f77bcf86cd799439011

   ✅ BTC: 0 → 1000 (+1000)
   ✅ ETH: 0 → 1000 (+1000)
   ✅ USDT: 0 → 1000 (+1000)
   ✅ BSC: 0 → 1000 (+1000)
   ✅ TRX: 0 → 1000 (+1000)
   ✅ SOL: 0 → 1000 (+1000)

🎉 Successfully added 1000 of each currency!
```

### Add Custom Amount

```bash
cd backend
node scripts/addBalance.js <USER_ID> <COIN_TYPE> <AMOUNT>

# Example: Add 5000 ETH to specific user
node scripts/addBalance.js 507f1f77bcf86cd799439011 ETH 5000
```

---

## 🏛️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                   CRYPTO GAMEFI PLATFORM                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  👤 Users                                               │
│     │                                                   │
│     ├──► Frontend (8800) ──────┐                       │
│     │                           │                       │
│     └──► Admin UI (9000) ───────┼──┐                   │
│                                 │  │                   │
│                                 ▼  ▼                   │
│                          Backend API (5001)            │
│                          Admin API (6100)              │
│                                 │                       │
│                                 ▼                       │
│                            MongoDB                      │
│                                 │                       │
│                                 ▼                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Game Microservices                      │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  🎮 Turtle (5100)  🎲 Dice (5400)             │   │
│  │  ✂️  Scissors (5200) 🎰 Slot (5500)            │   │
│  │  💣 Mines (5300)   📊 Plinko (5600)           │   │
│  │  🚀 Crash (5700)                               │   │
│  │  💬 Chat (4900)    ⚙️  Management (4000)       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

**User Game Flow:**
```
User Browser → Frontend (8800) → Backend API (5001) → MongoDB
                    ↓
            Game Service (e.g., Mines 5300)
                    ↓
            Socket.IO Real-time Updates
```

**Admin Flow:**
```
Admin Browser → Admin UI (9000) → Admin API (6100) → MongoDB
```

### Technology Stack

**Frontend:**
- React 18
- Material-UI (MUI)
- Redux
- Socket.IO Client
- Web3.js, Ethers.js

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO
- Web3.js, Ethers.js, TronWeb

**Infrastructure:**
- MongoDB
- Concurrently (process management)
- Tatum API, Infura

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem:** "mongodb connection error"

**Solution:**
```bash
# Start MongoDB service (Windows - as Administrator)
net start MongoDB

# Check if running
sc query MongoDB

# Or start manually via services.msc
```

### Port Already in Use (EADDRINUSE)

**Problem:** "Error: listen EADDRINUSE: address already in use"

**Solution:**
```bash
# Find process on port
netstat -ano | findstr ":5001"

# Kill the process (as Administrator)
taskkill /F /PID <PID_NUMBER>
```

### Network Errors in Browser

**Problem:** "Network Error" or "ERR_CONNECTION_REFUSED"

**Solution:**
1. Ensure MongoDB is running
2. Check backend started: Look for "server started on 5001 port"
3. Check admin backend: Look for "Admin Server starting on 6100"
4. Wait for webpack compilation: "webpack compiled"
5. Hard refresh browser (Ctrl+F5)

### Admin Panel Network Error

**Problem:** Admin panel shows "Network Error"

**Solution:**
- Verify Admin Backend API is running on port 6100
- Check console for "Admin Server starting on 6100"
- Refresh browser after services start

### Chunk Loading Error

**Problem:** "Loading chunk failed" in browser

**Solution:**
- Wait for webpack compilation to complete
- Look for "webpack compiled" in console
- Hard refresh browser (Ctrl+F5)

### Services Not Starting

**Problem:** Some game services fail to start

**Solution:**
- Check for port conflicts
- Kill existing processes on those ports
- Restart with `npm start`

---

## 🛡️ Security Features

* 🔐 **JWT-based Authentication**
* 🔒 **Secure Password Hashing** (bcrypt)
* 🔗 **Wallet Signature Verification**
* 🛑 **CORS Protection**
* ⚡ **Rate Limiting**
* 🎲 **Provably Fair Gaming** (Server + Client seeds)
* 🔍 **Input Validation**
* 📝 **Transaction Logging**

---

## 🧱 Tech Stack

### Frontend
- **Framework**: React 18
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Redux + Redux Thunk
- **Real-time**: Socket.IO Client
- **Web3**: Ethers.js, Web3.js
- **Build**: Webpack (react-scripts)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Real-time**: Socket.IO
- **Blockchain**: Web3.js, Ethers.js, TronWeb
- **API Integration**: Tatum, Infura

### DevOps
- **Process Manager**: Concurrently
- **Database**: MongoDB (local or Atlas)
- **Version Control**: Git

---

## 📦 Key Features

* 🔁 **Real-time Multiplayer Gameplay**
* 👛 **Multi-currency Wallet Support**
* 🗨️ **Live Chat System**
* 📊 **Game and Transaction History**
* 🧾 **Comprehensive Admin Dashboard**
* ⚡ **Instant Crypto Payouts**
* 🎲 **Provably Fair Gaming**
* 🔐 **Secure Authentication**
* 📱 **Responsive Design**
* 🌐 **Multi-chain Support**

---

## 🎮 Game Features

### Scissors (Rock-Paper-Scissors)
- Multiplayer real-time gameplay
- Fair random selection
- Instant results

### Crash
- Live multiplier graph
- Auto cashout feature
- Real-time betting

### Mines
- Minesweeper-style gameplay
- Multiple difficulty levels
- Provably fair mine placement

### Turtle Race
- Live race animation
- Multiple turtle betting
- Real-time results

### Dice
- Classic dice roll
- Under/Over betting
- Customizable multipliers

### Slot
- Traditional slot machine
- Multiple paylines
- Bonus rounds

### Plinko
- Ball drop physics
- Multiple risk levels
- Probability-based rewards

---

## 🚀 Deployment

### Development (Current)
```
Local Machine
├── MongoDB (localhost:27017)
├── Backend Services (localhost:5001, 6100, etc.)
├── Frontend Dev Server (localhost:8800)
└── Admin Dev Server (localhost:9000)
```

### Production (Recommended)
```
Cloud Infrastructure
├── Database Cluster (MongoDB Atlas)
├── Backend Services (Docker/Kubernetes)
│   ├── Load Balancer
│   ├── API Gateway
│   └── Microservices
├── Frontend (CDN + Static Hosting)
└── Admin Panel (Restricted Access)
```

### Production Configuration

1. **Update Environment Variables**
   ```env
   # backend/.env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
   JWT_SECRET=your_secure_random_secret
   TATUM_API_KEY=your_real_tatum_key
   WEB3_PROVIDER=your_real_infura_key
   ```

2. **Update Frontend Config**
   ```javascript
   // frontend/src/config/baseConfig.js
   const isLocal = false;
   const pro = 'https://api.yourdomain.com';
   ```

3. **Update Admin Config**
   ```javascript
   // admin/src/config/baseConfig.js
   const isLocal = false;
   const pro = 'https://admin-api.yourdomain.com';
   ```

4. **Build for Production**
   ```bash
   # Frontend
   cd frontend
   npm run build

   # Admin
   cd admin
   npm run build
   ```
   Username:admin,
   Password:admin
---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository** 🍴
2. **Create a feature branch** 🌱
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes** 💾
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch** 🚀
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** ✅

### Development Guidelines

- Follow existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📄 License

This project is licensed under the **ISC License**.

Feel free to build and contribute — responsibly and legally!

---

## 🙏 Acknowledgments

- **Tatum** - Blockchain API
- **Infura** - Ethereum node provider
- **MongoDB** - Database
- **React** - Frontend framework
- **Express** - Backend framework
- **Socket.IO** - Real-time communication

---

## 📞 Support

For issues and questions:

1. Check this README
2. Review console logs
3. Check MongoDB connection
4. Verify all services are running
5. Ensure ports are not in use

---

## 🎉 Quick Reference

### Essential Commands

```bash
# Install dependencies
npm install

# Start platform (all services)
npm start

# Migrate existing users (add 1000 ETH + 100 BIC)
npm run migrate-balances

# Add test rewards (1000 of each currency)
npm run add-rewards

# Docker deployment
npm run docker:up
npm run docker:down
npm run docker:logs
```

### Access Points
- **Main App**: http://localhost:8800
- **Admin Panel**: http://localhost:9000 (admin/admin)
- **Backend API**: http://localhost:5001/api

### Stop Platform
Press `Ctrl + C` in the terminal

---

## 📚 Additional Documentation

- **SETUP.md** - Quick setup guide with troubleshooting
- **CHANGES.md** - Complete list of optimizations and changes
- **QUICK_REFERENCE.md** - Command reference card
- **BALANCE_INFO.md** - User balance and rewards information

---

**Built with ❤️ for the crypto gaming community**

🎰 **Happy Gaming!** 🎮
