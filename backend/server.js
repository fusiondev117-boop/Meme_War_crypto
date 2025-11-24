const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const compression = require('compression');
const app = express();
const server = http.Server(app);
const config = require('./config');
const Logger = require('./utils/logger');
require('dotenv').config({ path: __dirname + '/.env' });

const initController = require('./controllers/initController');

// Middleware
app.use(compression());
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'authorization']
}));
app.use(bodyParser.json({ limit: '2mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));

const models = require('./models/index');
models.mongoose.connect(config.DB, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(() => {
        Logger.success('Server connected to MongoDB');
        initController.initCurrencies();
        initController.initTatumBTC();
        initController.initTatumETH();
        initController.initTatumTRX();
        initController.initTatumBSC();
    })
    .catch((err) => {
        Logger.error('MongoDB connection failed', err.message);
        process.exit(1);
    });
app.use(express.static('client'));

app.get('/', (req, res) => {
    res.json({ 
        status: 'online', 
        service: 'Crypto GameFi Backend API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        mongodb: models.mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        uptime: process.uptime()
    });
});

app.use('', require('./middleware/index'), require('./routes/index'));

server.listen(config.SERVER_PORT, () => { 
    Logger.success(`Backend API started on port ${config.SERVER_PORT}`);
    Logger.info(`Environment: ${config.isDevelopment ? 'Development' : 'Production'}`);
    Logger.info(`Health check: http://localhost:${config.SERVER_PORT}/health`);
});