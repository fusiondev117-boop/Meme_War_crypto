# 📁 Project Structure

## Root Directory

```
crypto-gamefi/
│
├── 📁 backend/              # Backend services (Node.js + Express)
│   ├── admin/               # Admin backend API (port 6100)
│   ├── management/          # Management service (port 4000)
│   ├── userchat/            # Chat service (port 4900)
│   ├── turtlerace/          # Turtle game (port 5100)
│   ├── scissors/            # Scissors game (port 5200)
│   ├── mines/               # Mines game (port 5300)
│   ├── dice/                # Dice game (port 5400)
│   ├── slot/                # Slot game (port 5500)
│   ├── plinko/              # Plinko game (port 5600)
│   ├── crash/               # Crash game (port 5700)
│   ├── controllers/         # API controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── scripts/             # Utility scripts
│   ├── server.js            # Main backend (port 5001)
│   ├── config.js            # Configuration
│   ├── .env                 # Environment variables
│   └── package.json         # Backend dependencies
│
├── 📁 frontend/             # React frontend (port 8800)
│   ├── public/              # Static assets
│   ├── src/                 # React source code
│   │   ├── config/          # API configuration
│   │   ├── views/           # Game views
│   │   ├── layout/          # Layout components
│   │   ├── components/      # Reusable components
│   │   └── redux/           # State management
│   ├── .env                 # Frontend environment
│   └── package.json         # Frontend dependencies
│
├── 📁 admin/                # Admin panel (port 9000)
│   ├── public/              # Static assets
│   ├── src/                 # React source code
│   │   ├── config/          # Admin API config
│   │   ├── views/           # Admin views
│   │   ├── layout/          # Layout components
│   │   └── components/      # Admin components
│   └── package.json         # Admin dependencies
│
├── 📄 .env.example          # Environment template
├── 📄 .gitignore            # Git ignore rules
├── 📄 package.json          # Root package config
├── 📄 README.md             # Complete documentation
├── 📄 QUICKSTART.md         # Quick start guide
└── 📄 OPTIMIZATION_COMPLETE.md  # Optimization summary
```

## Services Overview

### Backend Services (13 total)

| Service | Port | File | Description |
|---------|------|------|-------------|
| Main API | 5001 | backend/server.js | Core API, auth, users |
| Admin API | 6100 | backend/admin/AdminService.js | Admin operations |
| Management | 4000 | backend/management/ManagementService.js | Game coordination |
| Chat | 4900 | backend/userchat/UserChatService.js | Real-time chat |
| Turtle Race | 5100 | backend/turtlerace/TurtleService.js | Turtle game |
| Scissors | 5200 | backend/scissors/ScissorsService.js | RPS game |
| Mines | 5300 | backend/mines/MinesService.js | Mines game |
| Dice | 5400 | backend/dice/DiceService.js | Dice game |
| Slot | 5500 | backend/slot/SlotService.js | Slot game |
| Plinko | 5600 | backend/plinko/PlinkoService.js | Plinko game |
| Crash | 5700 | backend/crash/CrashService.js | Crash game |

### Frontend Services (2 total)

| Service | Port | Directory | Description |
|---------|------|-----------|-------------|
| Frontend | 8800 | frontend/ | Main user interface |
| Admin UI | 9000 | admin/ | Admin dashboard |

## Key Files

### Configuration
- `backend/.env` - Backend environment variables
- `frontend/.env` - Frontend environment variables
- `backend/config.js` - Backend configuration
- `frontend/src/config/baseConfig.js` - Frontend API config
- `admin/src/config/baseConfig.js` - Admin API config

### Scripts
- `backend/scripts/addTestRewards.js` - Add test crypto rewards
- `backend/scripts/addBalance.js` - Add balance to specific user

### Documentation
- `README.md` - Complete documentation
- `QUICKSTART.md` - Quick start guide
- `.env.example` - Environment template

## NPM Scripts

```bash
# Start all services
npm start

# Add test rewards
npm run add-rewards

# Individual services
npm run start:backend
npm run start:frontend
npm run start:admin
npm run start:admin-backend
npm run start:management
npm run start:chat
npm run start:turtle
npm run start:scissors
npm run start:mines
npm run start:dice
npm run start:slot
npm run start:plinko
npm run start:crash
```

## Database

- **MongoDB** (port 27017)
  - Database: `crypto-gamefi`
  - Collections: users, games, transactions, wallets, bets, currencies

## External APIs

- **Tatum API** - Blockchain operations
- **Infura** - Ethereum node provider
- **TronGrid** - Tron blockchain

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- Web3.js, Ethers.js, TronWeb

### Frontend
- React 18
- Material-UI (MUI)
- Redux
- Socket.IO Client
- Web3.js, Ethers.js

### DevOps
- Concurrently (process management)
- Git (version control)

## File Count

- **Total Files**: ~1000+
- **Root Files**: 8 (optimized)
- **Backend Services**: 13
- **Frontend Apps**: 2

## Summary

✅ Clean and organized structure
✅ Microservices architecture
✅ Separate frontend and admin
✅ Modular game services
✅ Clear configuration
✅ Well-documented

**Everything is organized and production-ready!** 🚀
