const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const verifyBalances = async () => {
    try {
        await mongoose.connect(config.DB);
        
        const users = await models.userModel.find();
        
        console.log('\n✅ ALL USER BALANCES:\n');
        
        for (const user of users) {
            console.log(`👤 ${user.userNickName || user.userName} (${user._id})`);
            console.log(`   Balance data array length: ${user.balance?.data?.length || 0}`);
            
            if (user.balance && user.balance.data) {
                const eth = user.balance.data.find(b => b.coinType === 'ETH' && b.type === 'native');
                const bic = user.balance.data.find(b => b.coinType === 'BIC');
                
                console.log(`   ETH: ${eth ? eth.balance : 'NOT FOUND'}`);
                console.log(`   BIC: ${bic ? bic.balance : 'NOT FOUND'}`);
                console.log(`   All coins: ${user.balance.data.map(b => b.coinType).join(', ')}`);
            }
            console.log('');
        }
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

verifyBalances();
