const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const addBalance = async (userId, coinType, amount) => {
    try {
        await mongoose.connect(config.DB);
        console.log('Connected to MongoDB');

        const user = await models.userModel.findById(userId);
        if (!user) {
            console.error('User not found');
            process.exit(1);
        }

        console.log(`Current user: ${user.userNickName} (${user.userName})`);

        // Find the ETH balance entry
        const ethIndex = user.balance.data.findIndex(b => b.coinType === coinType && b.type === 'native');
        
        if (ethIndex !== -1) {
            const oldBalance = user.balance.data[ethIndex].balance;
            user.balance.data[ethIndex].balance += amount;
            await user.save();
            console.log(`✅ Successfully added ${amount} ${coinType}`);
            console.log(`Old balance: ${oldBalance} ${coinType}`);
            console.log(`New balance: ${user.balance.data[ethIndex].balance} ${coinType}`);
        } else {
            console.error(`${coinType} balance entry not found`);
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

// Get parameters from command line
const userId = process.argv[2] || '691d89b9752c815bae3df7c4';
const coinType = process.argv[3] || 'ETH';
const amount = parseFloat(process.argv[4]) || 1000;

addBalance(userId, coinType, amount);
