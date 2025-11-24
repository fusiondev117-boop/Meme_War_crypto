const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const forceFixBalances = async () => {
    try {
        console.log('\n╔═══════════════════════════════════════════════════════════╗');
        console.log('║         FORCE FIX - ENSURE 1000 ETH + 100 BIC            ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');

        await mongoose.connect(config.DB);
        console.log('✅ Connected to database\n');

        const users = await models.userModel.find();
        console.log(`📊 Found ${users.length} user(s) to process\n`);

        let fixedCount = 0;

        for (const user of users) {
            let needsUpdate = false;
            const updates = [];

            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`👤 User: ${user.userNickName || user.userName}`);
            console.log(`   ID: ${user._id}\n`);

            // Ensure balance structure exists
            if (!user.balance || !user.balance.data || !Array.isArray(user.balance.data)) {
                user.balance = { data: [] };
                needsUpdate = true;
                updates.push('   ✅ Created balance structure');
            }

            // Find or create ETH
            let ethIndex = user.balance.data.findIndex(b => b.coinType === 'ETH' && b.type === 'native');
            if (ethIndex === -1) {
                user.balance.data.push({ coinType: 'ETH', balance: 1000, chain: 'ETH', type: 'native' });
                needsUpdate = true;
                updates.push('   ✅ ETH: ADDED with 1000 balance');
            } else {
                const currentEth = user.balance.data[ethIndex].balance || 0;
                if (currentEth < 1000) {
                    user.balance.data[ethIndex].balance = 1000;
                    needsUpdate = true;
                    updates.push(`   ✅ ETH: ${currentEth} → 1000`);
                } else {
                    updates.push(`   ℹ️  ETH: ${currentEth} (OK)`);
                }
            }

            // Find or create BIC
            let bicIndex = user.balance.data.findIndex(b => b.coinType === 'BIC');
            if (bicIndex === -1) {
                user.balance.data.push({ coinType: 'BIC', balance: 100, chain: '', type: '' });
                needsUpdate = true;
                updates.push('   ✅ BIC: ADDED with 100 balance');
            } else {
                const currentBic = user.balance.data[bicIndex].balance || 0;
                if (currentBic < 100) {
                    user.balance.data[bicIndex].balance = 100;
                    needsUpdate = true;
                    updates.push(`   ✅ BIC: ${currentBic} → 100`);
                } else {
                    updates.push(`   ℹ️  BIC: ${currentBic} (OK)`);
                }
            }

            // Ensure other required coins exist
            const requiredCoins = [
                { coinType: 'BTC', balance: 0, chain: 'BTC', type: 'native' },
                { coinType: 'BNB', balance: 0, chain: 'BNB', type: 'native' },
                { coinType: 'TRX', balance: 0, chain: 'TRON', type: 'native' },
                { coinType: 'USDT', balance: 0, chain: 'ETH', type: 'erc-20' },
                { coinType: 'USDT', balance: 0, chain: 'BNB', type: 'bep-20' },
                { coinType: 'USDT', balance: 0, chain: 'TRON', type: 'trc-20' },
                { coinType: 'USDC', balance: 0, chain: 'ETH', type: 'erc-20' },
                { coinType: 'USDC', balance: 0, chain: 'BNB', type: 'bep-20' },
                { coinType: 'USDC', balance: 0, chain: 'TRON', type: 'trc-20' },
                { coinType: 'ZELO', balance: 0, chain: '', type: '' }
            ];

            for (const coin of requiredCoins) {
                const exists = user.balance.data.find(b => 
                    b.coinType === coin.coinType && 
                    b.type === coin.type &&
                    b.chain === coin.chain
                );
                
                if (!exists) {
                    user.balance.data.push(coin);
                    needsUpdate = true;
                }
            }

            // Set default currency to ETH if not set
            if (!user.currency || !user.currency.coinType) {
                user.currency = { coinType: 'ETH', type: 'native' };
                needsUpdate = true;
                updates.push('   ✅ Currency: SET to ETH');
            }

            // Print updates
            updates.forEach(update => console.log(update));

            if (needsUpdate) {
                await user.save();
                fixedCount++;
                console.log('\n   🎉 User updated successfully!');
            } else {
                console.log('\n   ✓ User already correct');
            }
            console.log('');
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n✅ FORCE FIX COMPLETE!`);
        console.log(`   Fixed: ${fixedCount} user(s)`);
        console.log(`   Total: ${users.length} user(s)\n`);
        console.log('🎮 ALL USERS NOW HAVE:');
        console.log('   • 1000 ETH minimum');
        console.log('   • 100 BIC minimum');
        console.log('   • ETH as default currency');
        console.log('   • Complete balance structure\n');
        
        await mongoose.disconnect();
        console.log('👋 Disconnected from database\n');

        process.exit(0);
    } catch (err) {
        console.error('\n❌ Error:', err.message);
        console.error(err.stack);
        process.exit(1);
    }
};

forceFixBalances();
