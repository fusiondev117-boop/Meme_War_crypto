const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const checkUserBalances = async () => {
    try {
        console.log('\n╔═══════════════════════════════════════════════════════════╗');
        console.log('║              CHECK USER BALANCES - DETAILED               ║');
        console.log('╚═══════════════════════════════════════════════════════════╝\n');

        await mongoose.connect(config.DB);
        console.log('✅ Connected to database\n');

        const users = await models.userModel.find();
        console.log(`📊 Found ${users.length} user(s)\n`);

        for (const user of users) {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`👤 User: ${user.userNickName || user.userName}`);
            console.log(`   Email: ${user.userEmail || 'N/A'}`);
            console.log(`   ID: ${user._id}`);
            console.log(`   Currency: ${user.currency?.coinType || 'NOT SET'} (${user.currency?.type || 'N/A'})\n`);

            if (!user.balance || !user.balance.data) {
                console.log('   ❌ NO BALANCE STRUCTURE!\n');
                continue;
            }

            console.log('   💰 Balances:');
            
            // Show ETH
            const eth = user.balance.data.find(b => b.coinType === 'ETH' && b.type === 'native');
            if (eth) {
                console.log(`      ETH: ${eth.balance} ${eth.balance >= 1000 ? '✅' : '❌ NEEDS 1000'}`);
            } else {
                console.log('      ETH: ❌ MISSING');
            }

            // Show BIC
            const bic = user.balance.data.find(b => b.coinType === 'BIC');
            if (bic) {
                console.log(`      BIC: ${bic.balance} ${bic.balance >= 100 ? '✅' : '❌ NEEDS 100'}`);
            } else {
                console.log('      BIC: ❌ MISSING');
            }

            // Show other coins with balance > 0
            const otherCoins = user.balance.data.filter(b => 
                b.coinType !== 'ETH' && 
                b.coinType !== 'BIC' && 
                b.balance > 0
            );
            
            if (otherCoins.length > 0) {
                console.log('\n   💵 Other Balances:');
                otherCoins.forEach(coin => {
                    console.log(`      ${coin.coinType}: ${coin.balance}`);
                });
            }

            console.log('');
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('\n❌ Error:', err.message);
        process.exit(1);
    }
};

checkUserBalances();
