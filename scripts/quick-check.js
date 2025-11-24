#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
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

async function checkNode() {
    try {
        const { stdout } = await execAsync('node --version');
        const version = stdout.trim();
        const majorVersion = parseInt(version.replace('v', '').split('.')[0]);
        
        if (majorVersion >= 16) {
            log.success(`Node.js ${version} installed`);
            return true;
        } else {
            log.error(`Node.js ${version} is too old (need v16+)`);
            return false;
        }
    } catch (error) {
        log.error('Node.js not found');
        return false;
    }
}

async function checkMongoDB() {
    try {
        const mongoose = require('mongoose');
        await mongoose.connect('mongodb://127.0.0.1:27017/crypto-gamefi', {
            serverSelectionTimeoutMS: 3000
        });
        
        log.success('MongoDB is running');
        await mongoose.disconnect();
        return true;
    } catch (error) {
        log.error('MongoDB is not running');
        return false;
    }
}

function checkDependencies() {
    const dirs = ['backend', 'frontend', 'admin'];
    let allInstalled = true;

    for (const dir of dirs) {
        const nodeModulesPath = path.join(__dirname, '..', dir, 'node_modules');
        if (fs.existsSync(nodeModulesPath)) {
            log.success(`${dir} dependencies installed`);
        } else {
            log.error(`${dir} dependencies not installed`);
            allInstalled = false;
        }
    }

    return allInstalled;
}

function checkEnvFile() {
    const envPath = path.join(__dirname, '..', 'backend', '.env');
    if (fs.existsSync(envPath)) {
        log.success('Environment file configured');
        return true;
    } else {
        log.error('Environment file not found');
        return false;
    }
}

async function runChecks() {
    log.header('🔍 SYSTEM READINESS CHECK');

    const checks = {
        node: await checkNode(),
        mongodb: await checkMongoDB(),
        dependencies: checkDependencies(),
        env: checkEnvFile()
    };

    console.log('\n' + '='.repeat(60));
    
    const allPassed = Object.values(checks).every(v => v);
    
    if (allPassed) {
        log.success('All checks passed! Ready to start platform');
        console.log('='.repeat(60) + '\n');
        log.info('Run: npm start');
    } else {
        log.error('Some checks failed. Please fix the issues above');
        console.log('='.repeat(60) + '\n');
        
        if (!checks.node) {
            log.info('Install Node.js: https://nodejs.org/');
        }
        
        if (!checks.mongodb) {
            log.info('Install MongoDB: See INSTALL_MONGODB.md');
            console.log('  Quick start MongoDB:');
            console.log('  • Windows: net start MongoDB');
            console.log('  • Mac: brew services start mongodb-community');
            console.log('  • Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest');
        }
        
        if (!checks.dependencies) {
            log.info('Install dependencies: npm install');
        }
        
        if (!checks.env) {
            log.info('Configure environment: cp backend/.env.example backend/.env');
        }
        
        console.log('');
        log.info('For detailed setup: See SETUP_GUIDE.md');
    }
    
    console.log('');
    process.exit(allPassed ? 0 : 1);
}

runChecks();
