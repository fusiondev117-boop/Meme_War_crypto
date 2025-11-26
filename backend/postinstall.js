#!/usr/bin/env node

const { execSync } = require('child_process');

// Postinstall script to handle optional native dependencies gracefully
console.log('✓ Backend dependencies installed successfully');
console.log('Note: Some optional native modules (like node-hid) may have been skipped.');
console.log('This is normal and will not affect the application functionality.\n');

// Rebuild bcrypt to ensure compatibility with current Node.js version
try {
    console.log('🔧 Rebuilding bcrypt for Node.js compatibility...');
    execSync('npm rebuild bcrypt', { stdio: 'inherit' });
    console.log('✓ bcrypt rebuilt successfully\n');
} catch (error) {
    console.error('⚠ Warning: Failed to rebuild bcrypt. You may need to run "npm rebuild bcrypt" manually.');
    console.error('Error:', error.message, '\n');
}

process.exit(0);
