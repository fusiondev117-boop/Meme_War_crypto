#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m'
};

const log = {
    info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

async function checkMongoDB() {
    log.header('🔍 CHECKING MONGODB STATUS');

    try {
        // Try to connect to MongoDB
        const mongoose = require('mongoose');
        await mongoose.connect('mongodb://127.0.0.1:27017/crypto-gamefi', {
            serverSelectionTimeoutMS: 3000
        });
        
        log.success('MongoDB is running and accessible!');
        log.info(`Database: crypto-gamefi`);
        log.info(`Connection: mongodb://127.0.0.1:27017`);
        
        await mongoose.disconnect();
        return true;
    } catch (error) {
        log.error('MongoDB is not running or not accessible');
        console.log('');
        log.warn('MongoDB is required to run this platform');
        console.log('');
        log.info('Installation Options:');
        console.log('');
        console.log('  1. Install MongoDB Community Edition:');
        console.log('     https://www.mongodb.com/try/download/community');
        console.log('');
        console.log('  2. Use MongoDB Atlas (Cloud - Free):');
        console.log('     https://www.mongodb.com/cloud/atlas/register');
        console.log('     Then update backend/.env with your connection string');
        console.log('');
        console.log('  3. Use Docker:');
        console.log('     docker run -d -p 27017:27017 --name mongodb mongo:latest');
        console.log('');
        
        return false;
    }
}

checkMongoDB().then(isRunning => {
    process.exit(isRunning ? 0 : 1);
});
