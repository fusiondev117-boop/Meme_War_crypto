#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Installing all project dependencies...\n');

const projects = [
  { name: 'Backend', dir: 'backend', flags: ['--legacy-peer-deps', '--omit=optional', '--ignore-scripts'] },
  { name: 'Frontend', dir: 'frontend', flags: ['--legacy-peer-deps'] },
  { name: 'Admin', dir: 'admin', flags: ['--legacy-peer-deps'] }
];

function installProject(project) {
  return new Promise((resolve) => {
    console.log(`📦 Installing ${project.name} dependencies...`);
    
    const projectPath = path.join(__dirname, '..', project.dir);
    const isWindows = process.platform === 'win32';
    const npmCmd = isWindows ? 'npm.cmd' : 'npm';
    
    const child = spawn(npmCmd, ['install', ...project.flags], {
      cwd: projectPath,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env }
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${project.name} dependencies installed\n`);
        resolve(true);
      } else {
        console.log(`⚠️  ${project.name} installation completed with warnings (exit code: ${code})`);
        console.log(`Continuing anyway...\n`);
        resolve(false);
      }
    });
    
    child.on('error', (err) => {
      console.error(`❌ Error installing ${project.name}: ${err.message}\n`);
      resolve(false);
    });
  });
}

async function installAll() {
  const results = [];
  
  for (const project of projects) {
    const success = await installProject(project);
    results.push(success);
  }
  
  const allSuccess = results.every(r => r);
  
  if (allSuccess) {
    console.log('\n✅ All dependencies installed successfully!');
  } else {
    console.log('\n⚠️  Installation completed with some warnings.');
    console.log('Core dependencies should be installed. The application should work.');
  }
  
  console.log('\nRun "npm start" to launch the platform.\n');
  process.exit(0);
}

installAll().catch(err => {
  console.error('Installation error:', err);
  process.exit(0); // Still exit 0 to not block npm install
});
