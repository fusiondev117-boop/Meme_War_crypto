const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up node_modules and lock files...\n');

const dirsToClean = [
  'node_modules',
  'backend/node_modules',
  'frontend/node_modules',
  'admin/node_modules'
];

const filesToClean = [
  'package-lock.json',
  'backend/package-lock.json',
  'frontend/package-lock.json',
  'admin/package-lock.json'
];

// Clean directories
dirsToClean.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing ${dir}...`);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true, maxRetries: 3 });
      console.log(`✓ Removed ${dir}`);
    } catch (err) {
      console.log(`⚠ Could not remove ${dir}: ${err.message}`);
    }
  }
});

// Clean files
filesToClean.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing ${file}...`);
    try {
      fs.unlinkSync(fullPath);
      console.log(`✓ Removed ${file}`);
    } catch (err) {
      console.log(`⚠ Could not remove ${file}: ${err.message}`);
    }
  }
});

console.log('\n✅ Cleanup complete! Run "npm install" to reinstall dependencies.');
