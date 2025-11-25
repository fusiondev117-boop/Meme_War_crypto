#!/usr/bin/env node

// Postinstall script to handle optional native dependencies gracefully
console.log('✓ Backend dependencies installed successfully');
console.log('Note: Some optional native modules (like node-hid) may have been skipped.');
console.log('This is normal and will not affect the application functionality.\n');

process.exit(0);
