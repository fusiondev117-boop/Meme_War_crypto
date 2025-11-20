const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const config = require('../config');
const models = require('../models/index');

const addETHReward = async (userIdentifier, amount) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.DB);
        console.log('Connected to MongoDB');

        // Find user by email, username, or nickname
        let user = await models.userModel.findOne({
            $or: [
                { userEmail: userIdentifier },
                { userName: userIdentifier },
                { userNickName: userIdentifier }
            ]
        });

        if (!user) {
            console.log('User not found. Listing all users:');
            const allUsers = await models.userModel.find({}, 'userNickName userEmail userName');
            allUsers.forEach((u, index) => {
                console.log(`${index + 1}. Nickname: ${u.userNickName}, Email: ${u.userEmail}, Username: ${u.userName}`);
            });
            process.exit(1);
        }

        // Find ETH balance index
        const ethIndex = user.balance.data.findIndex(
            item => item.coinType === 'ETH' && item.chain === 'ETH' && item.type === 'native'
        );

        if (ethIndex === -1) {
            console.log('ETH balance not found in user data');
            process.exit(1);
        }

        // Add the reward
        const oldBalance = user.balance.data[ethIndex].balance;
        user.balance.data[ethIndex].balance = oldBalance + amount;

        // Update user
        await models.userModel.findOneAndUpdate(
            { _id: user._id },
            { balance: user.balance }
        );

        console.log('\n✅ Reward Added Successfully!');
        console.log(`User: ${user.userNickName} (${user.userEmail})`);
        console.log(`Old ETH Balance: ${oldBalance}`);
        console.log(`New ETH Balance: ${user.balance.data[ethIndex].balance}`);
        console.log(`Amount Added: ${amount} ETH`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

// Get command line arguments
const userIdentifier = process.argv[2];
const amount = parseFloat(process.argv[3]) || 1000000;

if (!userIdentifier) {
    console.log('Usage: node addRewardToUser.js <email|username|nickname> [amount]');
    console.log('Example: node addRewardToUser.js user@example.com 1000000');
    process.exit(1);
}

addETHReward(userIdentifier, amount);
