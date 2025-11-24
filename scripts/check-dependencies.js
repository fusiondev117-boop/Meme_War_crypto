#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
};

console.log(`${colors.blue}Checking project structure...${colors.reset}`);

const requiredDirs = ['backend', 'frontend', 'admin'];
const missing = [];

for (const dir of requiredDirs) {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
        missing.push(dir);
    }
}

if (missing.length > 0) {
    console.log(`${colors.yellow}⚠ Missing directories: ${missing.join(', ')}${colors.reset}`);
    process.exit(1);
}

console.log(`${colors.green}✓ Project structure OK${colors.reset}`);
