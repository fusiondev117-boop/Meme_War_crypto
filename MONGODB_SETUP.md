# MongoDB Setup Guide

The backend needs MongoDB to run. Choose one option:

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

1. **Create Free Account**: https://www.mongodb.com/cloud/atlas/register
2. **Create a Cluster** (Free M0 tier)
3. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
4. **Update backend/.env**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crypto-gamefi?retryWrites=true&w=majority
   ```
   Replace `username`, `password`, and `cluster` with your values

5. **Restart**: `npm start`

## Option 2: Local MongoDB

### Windows
1. **Download**: https://www.mongodb.com/try/download/community
2. **Install** MongoDB Community Server
3. **Start MongoDB**:
   - MongoDB should start automatically as a service
   - Or run: `"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"`

### Mac
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### Verify MongoDB is Running
```bash
# Try connecting
mongosh
# Or
mongo
```

If successful, you'll see the MongoDB shell.

## After MongoDB is Running

1. **Restart the project**:
   ```bash
   npm start
   ```

2. **Check the logs** - You should see:
   ```
   [BACKEND] server started on 5000 port
   [BACKEND] server connected to mongodb successfully
   ```

3. **Open the app**: http://localhost:8800

## Troubleshooting

### "ECONNREFUSED 127.0.0.1:27017"
- MongoDB is not running
- Start MongoDB service

### "Authentication failed"
- Check your MongoDB URI username/password
- For local MongoDB, no auth is needed by default

### Still having issues?
The app is configured to use `mongodb://localhost:27017/crypto-gamefi` by default.
You can change this in `backend/.env`:
```env
MONGODB_URI=your_connection_string_here
```
