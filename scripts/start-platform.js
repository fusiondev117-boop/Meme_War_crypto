#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    cyan: '\x1b[36m'
};

const log = {
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

// Check if dependencies are installed
function checkDependencies() {
    const dirs = ['backend', 'frontend', 'admin'];
    const missing = [];

    for (const dir of dirs) {
        const nodeModulesPath = path.join(__dirname, '..', dir, 'node_modules');
        if (!fs.existsSync(nodeModulesPath)) {
            missing.push(dir);
        }
    }

    if (missing.length > 0) {
        log.error('Dependencies not installed in: ' + missing.join(', '));
        log.info('Run: npm install');
        process.exit(1);
    }
}

// Check MongoDB connection
async function checkMongoDB() {
    const envPath = path.join(__dirname, '..', 'backend', '.env');
    if (!fs.existsSync(envPath)) {
        log.warn('Backend .env file not found');
        log.info('Copy backend/.env.example to backend/.env and configure MongoDB');
        log.info('Run: cp backend/.env.example backend/.env');
        return false;
    }

    try {
        // Load environment variables
        require('dotenv').config({ path: envPath });
        
        // Get MongoDB URI from env or use default
        const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crypto-gamefi';
        
        log.info('Checking MongoDB connection...');
        log.info(`MongoDB URI: ${mongoUri.replace(/\/\/.*:.*@/, '//***:***@')}`);
        
        // Try to load mongoose from backend
        const mongoose = require(path.join(__dirname, '..', 'backend', 'node_modules', 'mongoose'));
        
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000
        });
        
        log.success('MongoDB connected successfully!');
        await mongoose.disconnect();
        return true;
    } catch (error) {
        log.error('MongoDB connection failed: ' + error.message);
        console.log('');
        log.warn('MongoDB is required to run this platform');
        console.log('');
        log.info('Quick fixes:');
        console.log('  • Windows: net start MongoDB (as Administrator)');
        console.log('  • Mac: brew services start mongodb-community');
        console.log('  • Linux: sudo systemctl start mongod');
        console.log('  • Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest');
        console.log('');
        log.info('For detailed setup instructions, see: SETUP_GUIDE.md');
        console.log('');
        return false;
    }
}

// Service configurations
const services = [
    { name: 'Backend API', cmd: 'node', args: ['backend/server.js'], color: colors.blue },
    { name: 'Frontend', cmd: 'npm', args: ['start', '--prefix', 'frontend'], color: colors.cyan },
    { name: 'Admin Panel', cmd: 'npm', args: ['start', '--prefix', 'admin'], color: colors.green },
    { name: 'Admin API', cmd: 'node', args: ['backend/admin/AdminService.js'], color: colors.red },
    { name: 'Management', cmd: 'node', args: ['backend/management/ManagementService.js'], color: colors.yellow },
    { name: 'Chat', cmd: 'node', args: ['backend/userchat/UserChatService.js'], color: colors.cyan },
    { name: 'Turtle Race', cmd: 'node', args: ['backend/turtlerace/TurtleService.js'], color: colors.blue },
    { name: 'Scissors', cmd: 'node', args: ['backend/scissors/ScissorsService.js'], color: colors.green },
    { name: 'Mines', cmd: 'node', args: ['backend/mines/MinesService.js'], color: colors.red },
    { name: 'Dice', cmd: 'node', args: ['backend/dice/DiceService.js'], color: colors.yellow },
    { name: 'Slot', cmd: 'node', args: ['backend/slot/SlotService.js'], color: colors.cyan },
    { name: 'Plinko', cmd: 'node', args: ['backend/plinko/PlinkoService.js'], color: colors.blue },
    { name: 'Crash', cmd: 'node', args: ['backend/crash/CrashService.js'], color: colors.green }
];

const processes = [];
let isShuttingDown = false;

function startService(service) {
    return new Promise((resolve) => {
        const child = spawn(service.cmd, service.args, {
            cwd: path.join(__dirname, '..'),
            stdio: ['ignore', 'pipe', 'pipe'],
            shell: true
        });

        child.stdout.on('data', (data) => {
            const output = data.toString().trim();
            if (output) {
                console.log(`${service.color}[${service.name}]${colors.reset} ${output}`);
            }
        });

        child.stderr.on('data', (data) => {
            const output = data.toString().trim();
            if (output && !output.includes('ExperimentalWarning')) {
                console.log(`${service.color}[${service.name}]${colors.reset} ${output}`);
            }
        });

        child.on('error', (error) => {
            log.error(`${service.name} failed to start: ${error.message}`);
        });

        child.on('exit', (code) => {
            if (!isShuttingDown && code !== 0) {
                log.error(`${service.name} exited with code ${code}`);
            }
        });

        processes.push({ name: service.name, process: child });
        
        // Give service a moment to start
        setTimeout(() => {
            log.success(`Started ${service.name}`);
            resolve();
        }, 100);
    });
}

async function startAllServices() {
    log.header('🎮 CRYPTO GAMEFI PLATFORM 🎮');
    
    checkDependencies();
    
    // Check if .env exists
    const envPath = path.join(__dirname, '..', 'backend', '.env');
    if (!fs.existsSync(envPath)) {
        log.warn('Backend .env file not found');
        log.info('Copy backend/.env.example to backend/.env');
        log.info('Run: cp backend/.env.example backend/.env');
        console.log('');
    }
    
    log.warn('Make sure MongoDB is running before starting!');
    log.info('Windows: net start MongoDB');
    log.info('macOS: brew services start mongodb-community');
    log.info('Linux: sudo systemctl start mongod');
    log.info('Docker: docker start mongodb');
    console.log('');
    log.info('Starting all services...\n');

    // Start backend services first
    for (let i = 0; i < 5; i++) {
        await startService(services[i]);
    }

    // Small delay before starting game services
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Start game services
    for (let i = 5; i < services.length; i++) {
        await startService(services[i]);
    }

    console.log('\n' + '='.repeat(60));
    log.success('All services started successfully!');
    console.log('='.repeat(60) + '\n');
    
    log.info('Access Points:');
    console.log(`  ${colors.cyan}Frontend:${colors.reset}    http://localhost:8800`);
    console.log(`  ${colors.green}Admin Panel:${colors.reset} http://localhost:9000 (admin/admin)`);
    console.log(`  ${colors.blue}Backend API:${colors.reset} http://localhost:5001/api\n`);
    
    log.warn('Press Ctrl+C to stop all services\n');
}

function shutdown() {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log('\n' + '='.repeat(60));
    log.info('Stopping all services...');
    console.log('='.repeat(60) + '\n');

    processes.forEach(({ name, process }) => {
        try {
            process.kill('SIGTERM');
            log.success(`Stopped ${name}`);
        } catch (err) {
            // Process already stopped
        }
    });

    setTimeout(() => {
        log.success('All services stopped');
        process.exit(0);
    }, 1000);
}

// Handle shutdown signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', () => {
    if (!isShuttingDown) {
        shutdown();
    }
});

// Start the platform
startAllServices().catch((err) => {
    log.error('Failed to start platform: ' + err.message);
    process.exit(1);
});
