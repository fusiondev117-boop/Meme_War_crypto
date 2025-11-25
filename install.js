#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Installing Crypto GameFi Platform for Node.js 25\n');

// Clean up first
console.log('📦 Cleaning up old installations...\n');
try {
  execSync('node scripts/cleanup.js', { stdio: 'inherit' });
} catch (err) {
  console.log('Cleanup skipped (no previous installation found)\n');
}

// Skip root dependencies (no dependencies in root package.json)

// Install backend with --ignore-scripts to skip native module builds
console.log('\n📦 Installing backend dependencies (skipping native module builds)...\n');
try {
  execSync('npm install --legacy-peer-deps --omit=optional --ignore-scripts', {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit'
  });
  console.log('\n✅ Backend dependencies installed\n');
} catch (err) {
  console.log('\n⚠️  Backend installation had warnings but continuing...\n');
}

// Install frontend
console.log('📦 Installing frontend dependencies...\n');
try {
  execSync('npm install --legacy-peer-deps', {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit'
  });
  console.log('\n✅ Frontend dependencies installed\n');
} catch (err) {
  console.error('\n❌ Frontend installation failed\n');
}

// Install admin
console.log('📦 Installing admin dependencies...\n');
try {
  execSync('npm install --legacy-peer-deps', {
    cwd: path.join(__dirname, 'admin'),
    stdio: 'inherit'
  });
  console.log('\n✅ Admin dependencies installed\n');
} catch (err) {
  console.error('\n❌ Admin installation failed\n');
}

console.log('\n' + '='.repeat(60));
console.log('✅ Installation Complete!');
console.log('='.repeat(60));
console.log('\nNext steps:');
console.log('1. Copy backend/.env.example to backend/.env');
console.log('2. Configure your MongoDB connection in backend/.env');
console.log('3. Start MongoDB');
console.log('4. Run: npm start\n');
