const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const updateUserBalances = async () => {
    try {
        console.log('\n╔═══════════════════════════════════════════════════════════╗');
        console.log('║     UPDATE USER BALANCES - Add 1000 ETH + 100 BIC        ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');

        console.log('🔄 Connecting to database...');
        await mongoose.connect(config.DB);
        console.log('✅ Connected to database\n');

        // Get all users
        const users = await models.userModel.find();
        console.log(`📊 Found ${users.length} user(s) to check\n`);

        if (users.length === 0) {
            console.log('⚠️  No users found in database');
            console.log('Please register a user first at http://localhost:8800\n');
            await mongoose.disconnect();
            process.exit(0);
        }

        let updatedCount = 0;

        for (const user of users) {
            let needsUpdate = false;
            const updates = [];

            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`👤 User: ${user.userNickName || user.userName}`);
            console.log(`   Email: ${user.userEmail || 'N/A'}`);
            console.log(`   ID: ${user._id}\n`);

            // Check if BIC coin exists
            const bicIndex = user.balance.data.findIndex(b => b.coinType === 'BIC');
            if (bicIndex === -1) {
                // Add BIC coin with 100 balance
                user.balance.data.push({ coinType: 'BIC', balance: 100, chain: '', type: '' });
                needsUpdate = true;
                updates.push('   ✅ BIC: 0 → 100 (+100) [ADDED]');
            } else {
                const currentBic = user.balance.data[bicIndex].balance;
                if (currentBic < 100) {
                    user.balance.data[bicIndex].balance = 100;
                    needsUpdate = true;
                    updates.push(`   ✅ BIC: ${currentBic} → 100 (+${100 - currentBic})`);
                } else {
                    updates.push(`   ℹ️  BIC: ${currentBic} (no change needed)`);
                }
            }

            // Check ETH balance
            const ethIndex = user.balance.data.findIndex(b => b.coinType === 'ETH' && b.type === 'native');
            if (ethIndex !== -1) {
                const currentEth = user.balance.data[ethIndex].balance;
                if (currentEth < 1000) {
                    user.balance.data[ethIndex].balance = 1000;
                    needsUpdate = true;
                    updates.push(`   ✅ ETH: ${currentEth} → 1000 (+${1000 - currentEth})`);
                } else {
                    updates.push(`   ℹ️  ETH: ${currentEth} (no change needed)`);
                }
            }

            // Print all updates
            updates.forEach(update => console.log(update));

            if (needsUpdate) {
                await user.save();
                updatedCount++;
                console.log('\n   🎉 User updated successfully!');
            } else {
                console.log('\n   ✓ User already has correct balances');
            }
            console.log('');
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n✅ Migration complete!`);
        console.log(`   Updated: ${updatedCount} user(s)`);
        console.log(`   Skipped: ${users.length - updatedCount} user(s) (already correct)\n`);
        console.log('🎮 All users now have at least 1000 ETH and 100 BIC!\n');
        
        await mongoose.disconnect();
        console.log('👋 Disconnected from database\n');

        process.exit(0);
    } catch (err) {
        console.error('\n❌ Error:', err.message);
        console.error(err.stack);
        process.exit(1);
    }
};

updateUserBalances();
