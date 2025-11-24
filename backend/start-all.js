const { spawn } = require('child_process');
const path = require('path');

const services = [
    { name: 'Main Server', script: 'server.js' },
    { name: 'Management', script: 'management/ManagementService.js' },
    { name: 'Chat Room', script: 'userchat/UserChatService.js' },
    { name: 'Turtle Race', script: 'turtlerace/TurtleService.js' },
    { name: 'Scissors', script: 'scissors/ScissorsService.js' },
    { name: 'Mines', script: 'mines/MinesService.js' },
    { name: 'Dice', script: 'dice/DiceService.js' },
    { name: 'Slot', script: 'slot/SlotService.js' },
    { name: 'Plinko', script: 'plinko/PlinkoService.js' },
    { name: 'Crash', script: 'crash/CrashService.js' }
];

const processes = [];

console.log('Starting all game services...\n');

services.forEach(service => {
    const child = spawn('node', [service.script], {
        cwd: __dirname,
        stdio: 'inherit',
        shell: true
    });

    child.on('error', (error) => {
        console.error(`[${service.name}] Error: ${error.message}`);
    });

    child.on('exit', (code) => {
        if (code !== 0) {
            console.error(`[${service.name}] Exited with code ${code}`);
        }
    });

    processes.push({ name: service.name, process: child });
    console.log(`✓ Started ${service.name}`);
});

console.log('\nAll services started successfully!');
console.log('Press Ctrl+C to stop all services\n');

process.on('SIGINT', () => {
    console.log('\nStopping all services...');
    processes.forEach(({ name, process }) => {
        process.kill();
        console.log(`✓ Stopped ${name}`);
    });
    process.exit(0);
});
