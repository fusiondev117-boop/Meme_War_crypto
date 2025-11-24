const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const defaultBalanceStructure = {
    data: [
        { coinType: 'BTC', balance: 0, chain: 'BTC', type: 'native' },
        { coinType: 'ETH', balance: 1000, chain: 'ETH', type: 'native' },
        { coinType: 'BNB', balance: 0, chain: 'BNB', type: 'native' },
        { coinType: 'TRX', balance: 0, chain: 'TRON', type: 'native' },
        { coinType: 'USDT', balance: 0, chain: 'ETH', type: 'erc-20' },
        { coinType: 'USDT', balance: 0, chain: 'BNB', type: 'bep-20' },
        { coinType: 'USDT', balance: 0, chain: 'TRON', type: 'trc-20' },
        { coinType: 'USDC', balance: 0, chain: 'ETH', type: 'erc-20' },
        { coinType: 'USDC', balance: 0, chain: 'BNB', type: 'bep-20' },
        { coinType: 'USDC', balance: 0, chain: 'TRON', type: 'trc-20' },
        { coinType: 'BIC', balance: 100, chain: '', type: '' },
        { coinType: 'ZELO', balance: 0, chain: '', type: '' }
    ]
};

const defaultCurrency = { coinType: 'ETH', type: 'native' };

const fixUserBalances = async () => {
    try {
        console.log('\n╔═══════════════════════════════════════════════════════════╗');
        console.log('║         FIX USER BALANCES & SET DEFAULT CURRENCY          ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');

        console.log('🔄 Connecting to database...');
        await mongoose.connect(config.DB);
        console.log('✅ Connected to database\n');

        const users = await models.userModel.find();
        console.log(`📊 Found ${users.length} user(s) to fix\n`);

        if (users.length === 0) {
            console.log('⚠️  No users found in database');
            console.log('Please register a user first at http://localhost:8800\n');
            await mongoose.disconnect();
            process.exit(0);
        }

        let fixedCount = 0;

        for (const user of users) {
            let needsUpdate = false;
            const updates = [];

            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`👤 User: ${user.userNickName || user.userName}`);
            console.log(`   ID: ${user._id}\n`);

            // Fix balance structure
            if (!user.balance || !user.balance.data || !Array.isArray(user.balance.data)) {
                console.log('   ⚠️  Balance structure missing or invalid');
                user.balance = defaultBalanceStructure;
                needsUpdate = true;
                updates.push('   ✅ Balance structure: FIXED (added default structure)');
            } else {
                // Ensure all required coins exist
                const requiredCoins = defaultBalanceStructure.data;
                
                for (const requiredCoin of requiredCoins) {
                    const exists = user.balance.data.find(b => 
                        b.coinType === requiredCoin.coinType && 
                        b.type === requiredCoin.type &&
                        b.chain === requiredCoin.chain
                    );
                    
                    if (!exists) {
                        user.balance.data.push(requiredCoin);
                        needsUpdate = true;
                        updates.push(`   ✅ Added missing coin: ${requiredCoin.coinType} (${requiredCoin.type || 'native'})`);
                    }
                }

                // Ensure ETH has at least 1000
                const ethIndex = user.balance.data.findIndex(b => b.coinType === 'ETH' && b.type === 'native');
                if (ethIndex !== -1) {
                    const currentEth = user.balance.data[ethIndex].balance || 0;
                    if (currentEth < 1000) {
                        user.balance.data[ethIndex].balance = 1000;
                        needsUpdate = true;
                        updates.push(`   ✅ ETH: ${currentEth} → 1000 (+${1000 - currentEth})`);
                    }
                }

                // Ensure BIC has at least 100
                const bicIndex = user.balance.data.findIndex(b => b.coinType === 'BIC');
                if (bicIndex !== -1) {
                    const currentBic = user.balance.data[bicIndex].balance || 0;
                    if (currentBic < 100) {
                        user.balance.data[bicIndex].balance = 100;
                        needsUpdate = true;
                        updates.push(`   ✅ BIC: ${currentBic} → 100 (+${100 - currentBic})`);
                    }
                }
            }

            // Fix currency setting
            if (!user.currency || !user.currency.coinType) {
                console.log('   ⚠️  Currency not set');
                user.currency = defaultCurrency;
                needsUpdate = true;
                updates.push('   ✅ Currency: SET to ETH (default)');
            } else {
                updates.push(`   ℹ️  Currency: ${user.currency.coinType} (already set)`);
            }

            // Print all updates
            if (updates.length > 0) {
                updates.forEach(update => console.log(update));
            }

            if (needsUpdate) {
                await user.save();
                fixedCount++;
                console.log('\n   🎉 User fixed successfully!');
            } else {
                console.log('\n   ✓ User already has correct setup');
            }
            console.log('');
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n✅ Fix complete!`);
        console.log(`   Fixed: ${fixedCount} user(s)`);
        console.log(`   Skipped: ${users.length - fixedCount} user(s) (already correct)\n`);
        console.log('🎮 All users now have:');
        console.log('   • Proper balance structure');
        console.log('   • 1000 ETH + 100 BIC minimum');
        console.log('   • ETH set as default currency\n');
        
        await mongoose.disconnect();
        console.log('👋 Disconnected from database\n');

        process.exit(0);
    } catch (err) {
        console.error('\n❌ Error:', err.message);
        console.error(err.stack);
        process.exit(1);
    }
};

fixUserBalances();
