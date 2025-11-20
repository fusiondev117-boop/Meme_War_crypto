const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const addTestRewards = async () => {
    try {
        await mongoose.connect(config.DB);
        console.log('✅ Connected to MongoDB');
        console.log('');

        // Get all users
        const users = await models.userModel.find({});
        
        if (users.length === 0) {
            console.log('⚠️  No users found in database');
            console.log('Please register a user first at http://localhost:8800');
            await mongoose.disconnect();
            process.exit(0);
        }

        console.log(`Found ${users.length} user(s)`);
        console.log('');

        // Currencies to add
        const currencies = [
            { coinType: 'BTC', amount: 1000 },
            { coinType: 'ETH', amount: 1000 },
            { coinType: 'USDT', amount: 1000 },
            { coinType: 'BSC', amount: 1000 },
            { coinType: 'TRX', amount: 1000 },
            { coinType: 'SOL', amount: 1000 }
        ];

        // Add rewards to each user
        for (const user of users) {
            console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
            console.log(`👤 User: ${user.userNickName || user.userName}`);
            console.log(`   ID: ${user._id}`);
            console.log('');

            for (const currency of currencies) {
                const balanceIndex = user.balance.data.findIndex(
                    b => b.coinType === currency.coinType && b.type === 'native'
                );

                if (balanceIndex !== -1) {
                    const oldBalance = user.balance.data[balanceIndex].balance;
                    user.balance.data[balanceIndex].balance += currency.amount;
                    console.log(`   ✅ ${currency.coinType}: ${oldBalance} → ${user.balance.data[balanceIndex].balance} (+${currency.amount})`);
                } else {
                    // Create new balance entry if it doesn't exist
                    user.balance.data.push({
                        coinType: currency.coinType,
                        type: 'native',
                        balance: currency.amount,
                        address: '',
                        depositAddress: ''
                    });
                    console.log(`   ✅ ${currency.coinType}: 0 → ${currency.amount} (+${currency.amount}) [NEW]`);
                }
            }

            await user.save();
            console.log('');
        }

        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log('');
        console.log('🎉 Successfully added 1000 of each currency to all users!');
        console.log('');
        console.log('Currencies added:');
        currencies.forEach(c => console.log(`   • ${c.amount} ${c.coinType}`));
        console.log('');
        console.log('Refresh your browser to see the updated balances.');

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        await mongoose.disconnect();
        process.exit(1);
    }
};

console.log('');
console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║         ADD TEST REWARDS - 1000 Each Currency             ║');
console.log('╚═══════════════════════════════════════════════════════════╝');
console.log('');

addTestRewards();
