const mongoose = require('mongoose');
const { generateSeed } = require('../../helper/mainHelper');
const models = require('../../models/index');
const { payout } = require('../constant');
const { requestBalanceUpdate, requestWargerAmountUpdate } = require('../socket/Manager');

exports.saveScissorsRound = async (data) => {
    try {
        const userData = await models.userModel.findOne({ _id: data.userId });
        
        // Check if user has balance object
        if (!userData) {
            return { status: false, message: 'User not found' };
        }
        
        if (!userData.balance || !userData.balance.data || !Array.isArray(userData.balance.data)) {
            console.error('User balance not properly initialized:', userData._id);
            return { status: false, message: 'User balance not initialized. Please contact support.' };
        }
        
        if (!userData.currency || !userData.currency.coinType) {
            console.error('User currency not set:', userData._id);
            return { status: false, message: 'Please select a currency first' };
        }
        
        const currencyIndex = userData.balance.data.findIndex(item => (item.coinType === userData.currency.coinType && item.type === userData.currency.type));
        
        if (currencyIndex === -1) {
            console.error('Currency not found in user balance:', userData.currency);
            return { status: false, message: 'Selected currency not available' };
        }
        
        if (userData.balance.data[currencyIndex].balance < Number(data.betAmount)) {
            return { status: false, message: 'Not enough balance' };
        }
        else {
            requestWargerAmountUpdate({ userId: data.userId, amount: data.betAmount, coinType: userData.currency });
            const roundData = await new models.scissorsRoundModel({
                roundNumber: data.roundNumber,
                userId: data.userId,
                betAmount: data.betAmount,
                coinType: data.coinType,
                betNumber: data.playerNumber,
                winNumber: data.dealerNumber,
                roundResult: data.result,
                serverSeed: data.serverSeed,
                clientSeed: data.clientSeed,
                payout: payout,
                roundDate: new Date()
            }).save();
            if (data.result === 'win') {
                userData.balance.data[currencyIndex].balance = userData.balance.data[currencyIndex].balance + data.betAmount * (payout - 1);
                await models.userModel.findOneAndUpdate({ _id: data.userId }, { 'balance': userData.balance });
            }
            else if (data.result === 'lost') {
                userData.balance.data[currencyIndex].balance = userData.balance.data[currencyIndex].balance - data.betAmount;
                await models.userModel.findOneAndUpdate({ _id: data.userId }, { 'balance': userData.balance });
            }
            setTimeout(() => {
                requestBalanceUpdate(userData);
            }, 6000);
            return { status: true, data: userData, roundData: roundData };
        }
    }
    catch (err) {
        console.error({ title: 'scissorsController => saveScissorsRound', message: err.message });
        return { status: false, message: err.message };
    }
}

exports.getHistory = async (data) => {
    try {
        const { userId } = data;
        const historyData = await models.scissorsRoundModel.find({ userId }).sort({ roundDate: -1 }).limit(5);
        return historyData;
    }
    catch (err) {
        console.error({ title: 'scissorsController => getHistory', message: err.message });
        return { status: false, message: err.message };
    }
}

exports.getSeedData = async (userId) => {
    try {
        let clientSeedData = await models.seedModel.findOne({ userId: userId, type: 'client' }).sort({ date: -1 });
        if (!clientSeedData) {
            clientSeedData = await new models.seedModel({ userId: new mongoose.Types.ObjectId(userId), type: 'client', seed: generateSeed(), date: new Date() }).save();
        }
        let serverSeedData = await models.seedModel.findOne({ type: 'server' }).sort({ date: -1 });
        if (!serverSeedData) {
            serverSeedData = await new models.seedModel({ type: 'server', seed: generateSeed(), date: new Date() }).save();
        }
        return { serverSeedData, clientSeedData };
    }
    catch (err) {
        console.error({ title: 'scissorsController => getSeedData', message: err.message });
        return { status: false, message: err.message };
    }
}