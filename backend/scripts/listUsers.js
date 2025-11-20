const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const config = require('../config');
const models = require('../models/index');

const listUsers = async () => {
    try {
        await mongoose.connect(config.DB);
        console.log('Connected to MongoDB\n');

        const users = await models.userModel.find({});
        
        if (users.length === 0) {
            console.log('No users found in the database.');
        } else {
            console.log(`Found ${users.length} user(s):\n`);
            users.forEach((user, index) => {
                const ethBalance = user.balance.data.find(b => b.coinType === 'ETH' && b.type === 'native');
                console.log(`${index + 1}. ${user.userNickName || 'No nickname'}`);
                console.log(`   Email: ${user.userEmail || 'N/A'}`);
                console.log(`   ID: ${user._id}`);
                console.log(`   ETH Balance: ${ethBalance ? ethBalance.balance : 0}`);
                console.log('');
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

listUsers();
