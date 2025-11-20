# 🎰 Crypto Gamefi 🎮

**Scissors • Crash • Mines • Turtle • Plinko • Dice • Slot Game**
A modern crypto-powered gaming platform supporting multi-chain tokens and exciting on-chain games.

![Platform Preview](https://github.com/user-attachments/assets/a770c0e9-b45b-49f2-90a7-c215562f0b58)

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

---

## 💰 Supported Cryptocurrencies

* ₿ Bitcoin (BTC)
* Ξ Ethereum (ETH)
* $ Abstract
* 🟡 Binance Smart Chain (BSC)
* 🔷 Solana (SOL)
* 💵 USDT (All major chains)

---

## 🏗️ Project Structure

### Frontend (Port: `8800`)

* Game UI and wallet interactions
* Real-time Socket.IO updates
* User account dashboard

### Admin Panel (Port: `9000`)

* Game & user management
* Live transaction monitoring
* Platform analytics

### Backend (Microservices)

| Service                    | Port |
| -------------------------- | ---- |
| Main Backend API           | 5001 |
| Admin Backend API          | 6100 |
| Management Service         | 4000 |
| Chat Service               | 4900 |
| Turtle Race Game           | 5100 |
| Scissors Game              | 5200 |
| Mines Game                 | 5300 |
| Dice Game                  | 5400 |
| Slot Game                  | 5500 |
| Plinko Game                | 5600 |
| Crash Game                 | 5700 |

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js `v16+` 
* MongoDB (Local or Atlas)
* Web crypto wallet (MetaMask, TrustWallet, etc.)

### 📦 Installation

```bash
# Install all dependencies (root, backend, frontend, admin)
npm install
```

### 🎯 Quick Start (Recommended)

**Option 1: Automated Startup (Windows)**
```bash
# Run as Administrator for best results
start-clean.bat
```

**Option 2: Manual Startup**
```bash
# 1. Start MongoDB (if not running)
net start MongoDB

# 2. Start all services
npm start
```

This will start ALL services simultaneously:
- Backend API (Port 5001)
- Frontend (Port 8800)
- Admin Panel UI (Port 9000)
- Admin Backend API (Port 6100)
- All game services (Turtle, Mines, Dice, Slot, Plinko, Crash, Scissors)
- Management & Chat services

### 🌐 Access Points

After starting, access:
- **Main App**: http://localhost:8800
- **Admin Panel**: http://localhost:9000 (Login: admin/admin)
- **Backend API**: http://localhost:5001/api

### 🔧 Individual Service Setup (Advanced)

```bash
# Backend only
cd backend
npm start

# Frontend only
cd frontend
npm start

# Admin Panel only
cd admin
npm start

# Individual game services
npm run start:turtle
npm run start:mines
npm run start:dice
# ... etc
```

---

## ⚙️ Configuration

### Backend Configuration (`backend/.env`)

```env
MONGODB_URI=mongodb://127.0.0.1:27017/crypto-gamefi
JWT_SECRET=crypto_gamefi_secret_key_2024
SERVER_PORT=5001
TATUM_API_KEY=your_tatum_api_key
WEB3_PROVIDER=https://mainnet.infura.io/v3/your_infura_key
```

### Frontend Configuration (`frontend/.env`)

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

**Note**: API URLs are configured in `frontend/src/config/baseConfig.js`

### Admin Configuration

Admin API endpoints are configured in `admin/src/config/baseConfig.js`

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB service
net start MongoDB

# Or check if it's running
sc query MongoDB
```

### Port Already in Use (EADDRINUSE)
```bash
# Find process on port
netstat -ano | findstr ":5001"

# Kill the process (as Administrator)
taskkill /F /PID <PID_NUMBER>
```

### Network Errors in Browser
1. Ensure MongoDB is running
2. Check backend is running on port 5001
3. Check admin backend is running on port 6100
4. Clear browser cache and reload

### Admin Panel Shows Network Error
- Verify Admin Backend API is running on port 6100
- Check console for "Admin Server starting on 6100"

For detailed troubleshooting, see `START_PROJECT.md`

---

## 🛡️ Security Highlights

* 🔐 JWT-based auth
* 🧪 Two-Factor Authentication (2FA)
* 🔗 Secure wallet integration
* 🛑 DDoS Protection
* ⚡ Rate Limiting

---

## 🧱 Tech Stack

* **Backend**: Node.js + Express.js
* **Frontend**: React.js
* **Database**: MongoDB
* **Real-Time**: Socket.IO
* **Blockchain**: Web3.js, Ethers.js, TronWeb
* **Payments**: Tatum API

---

## 🌉 Blockchain & API Integration

* Multi-chain Web3 Providers
* Native node access
* Tatum for wallet & transaction processing

---

## 📦 Key Features

* 🔁 Real-time multiplayer gameplay
* 👛 Multi-currency wallet support
* 🗨️ Live chat
* 📊 Game and transaction history
* 🧾 Admin dashboard & analytics
* ⚡ Instant crypto payouts

---

## 🤝 Contributing

1. Fork the repo 🍴
2. Create your feature branch 🌱
3. Commit changes 💾
4. Push the branch 🚀
5. Open a Pull Request ✅

---

## 📄 License

This project is licensed under the **ISC License**.
Feel free to build and contribute — responsibly and legally!
