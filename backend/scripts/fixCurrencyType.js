const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const fixCurrencyType = async () => {
    try {
        console.log('\n🔧 Fixing currency type for all users\n');
        
        await mongoose.connect(config.DB);
        
        const users = await models.userModel.find();
        let fixedCount = 0;
        
        for (const user of users) {
            let needsUpdate = false;
            
            // Check if currency type is empty or missing
            if (user.currency && user.currency.coinType === 'ETH' && (!user.currency.type || user.currency.type === '')) {
                user.currency.type = 'native';
                needsUpdate = true;
                console.log(`✅ Fixed currency type for ${user.userNickName}: ETH → ETH (native)`);
            }
            
            if (needsUpdate) {
                await user.save();
                fixedCount++;
            }
        }
        
        console.log(`\n✅ Fixed ${fixedCount} user(s)\n`);
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

fixCurrencyType();
