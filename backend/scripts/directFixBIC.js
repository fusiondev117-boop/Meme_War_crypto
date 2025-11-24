const mongoose = require('mongoose');
const models = require('../models/index');
const config = require('../config');

const directFixBIC = async () => {
    try {
        console.log('\n🔧 DIRECT FIX - Adding BIC to users without it\n');
        
        await mongoose.connect(config.DB);
        
        const users = await models.userModel.find();
        let fixedCount = 0;
        
        for (const user of users) {
            const hasBIC = user.balance?.data?.some(b => b.coinType === 'BIC');
            
            if (!hasBIC) {
                console.log(`❌ User ${user.userNickName} missing BIC - FIXING...`);
                
                // Direct MongoDB update
                await models.userModel.updateOne(
                    { _id: user._id },
                    { 
                        $push: { 
                            'balance.data': { 
                                coinType: 'BIC', 
                                balance: 100, 
                                chain: '', 
                                type: '' 
                            } 
                        } 
                    }
                );
                
                console.log(`✅ Added BIC (100) to ${user.userNickName}\n`);
                fixedCount++;
            } else {
                const bic = user.balance.data.find(b => b.coinType === 'BIC');
                console.log(`✅ User ${user.userNickName} already has BIC: ${bic.balance}\n`);
            }
        }
        
        console.log(`\n🎉 Fixed ${fixedCount} user(s)\n`);
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

directFixBIC();
