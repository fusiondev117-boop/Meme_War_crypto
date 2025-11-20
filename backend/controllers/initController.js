const models = require('../models/index');
const tatumController = require('./tatumController');

exports.initCurrencies = async () => {
    try {
        const count = await models.currencyListModel.countDocuments();
        if (count === 0) {
            const currencies = [
                { currencyName: 'BTC', fullName: 'Bitcoin', decimal: 8, token: '', available: true, withdrawable: true, swapable: true },
                { currencyName: 'ETH', fullName: 'Ethereum', decimal: 8, token: '', available: true, withdrawable: true, swapable: true },
                { currencyName: 'BNB', fullName: 'Binance Coin', decimal: 8, token: '', available: true, withdrawable: true, swapable: true },
                { currencyName: 'TRX', fullName: 'Tron', decimal: 6, token: '', available: true, withdrawable: true, swapable: true },
                { currencyName: 'USDT', fullName: 'Tether (ERC-20)', decimal: 6, token: 'erc-20', available: true, withdrawable: true, swapable: true },
                { currencyName: 'USDT', fullName: 'Tether (BEP-20)', decimal: 6, token: 'bep-20', available: true, withdrawable: true, swapable: true },
                { currencyName: 'USDT', fullName: 'Tether (TRC-20)', decimal: 6, token: 'trc-20', available: true, withdrawable: true, swapable: true },
                { currencyName: 'USDC', fullName: 'USD Coin (ERC-20)', decimal: 6, token: 'erc-20', available: true, withdrawable: true, swapable: true },
                { currencyName: 'USDC', fullName: 'USD Coin (BEP-20)', decimal: 6, token: 'bep-20', available: true, withdrawable: true, swapable: true },
                { currencyName: 'USDC', fullName: 'USD Coin (TRC-20)', decimal: 6, token: 'trc-20', available: true, withdrawable: true, swapable: true },
                { currencyName: 'ZELO', fullName: 'Zelo Token', decimal: 4, token: '', available: true, withdrawable: false, swapable: true }
            ];
            await models.currencyListModel.insertMany(currencies);
            console.log('Currency list initialized with default currencies');
        }
    }
    catch (err) {
        console.error({ title: 'initController - initCurrencies', message: err.message });
    }
}

exports.initTatumBTC = async () => {
    try {
        let btcSetting = await models.settingModel.exists({ key: 'BTCWalletInfo' });
        if (btcSetting === null) {
            let btcWallet = await tatumController.createBitcoinWallet();
            if (btcWallet === null) return console.error('initTatumBTC createBitcoinWallet Error');

            let virtualAccount = await tatumController.createVirtualAccount({ xpub: btcWallet.xpub, coinType: 'BTC' });
            if (virtualAccount === null) return console.error('initTatumBTC createVirtualAccount Error');

            models.settingModel.create({ key: 'BTCWalletInfo', dataObject: { mnemonic: btcWallet.mnemonic, xpub: btcWallet.xpub, virtualAccount: virtualAccount } });
            console.log('BTCWalletInfo setting firstly saved');
        }
    }
    catch (err) {
        console.error({ title: 'initContoller - initTatumBTC', message: err.message });
        return undefined;
    }
}

exports.initTatumETH = async () => {
    try {
        let ethSetting = await models.settingModel.exists({ key: 'ETHWalletInfo' });
        if (ethSetting === null) {
            let ethWallet = await tatumController.createEthereumWallet();
            if (ethWallet === null) return console.error('initTatumETH createEthereumWallet Error');

            let virtualAccount = await tatumController.createVirtualAccount({ xpub: ethWallet.xpub, coinType: 'ETH' });
            if (virtualAccount === null) return console.error('initTatumETH createVirtualAccount Error');

            models.settingModel.create({ key: 'ETHWalletInfo', dataObject: { mnemonic: ethWallet.mnemonic, xpub: ethWallet.xpub, virtualAccount: virtualAccount } });
            console.log('ETHWalletInfo setting firstly saved');
        }
    }
    catch (err) {
        console.error({ title: 'initContoller - initTatumETH', message: err.message });
        return undefined;
    }
}

exports.initTatumTRX = async () => {
    try {
        let trxSetting = await models.settingModel.exists({ key: 'TRONWalletInfo' });
        if (trxSetting === null) {
            let trxWallet = await tatumController.createTronWallet();
            if (trxWallet === null) return console.error('initTatumTrx createTronWallet Error');

            let virtualAccount = await tatumController.createVirtualAccount({ xpub: trxWallet.xpub, coinType: 'TRON' });
            if (virtualAccount === null) return console.error('initTatumTrx createVirtualAccount Error');

            models.settingModel.create({ key: 'TRONWalletInfo', dataObject: { mnemonic: trxWallet.mnemonic, xpub: trxWallet.xpub, virtualAccount: virtualAccount } });
            console.log('TRONWalletInfo setting firstly saved');
        }
    }
    catch (err) {
        console.error({ title: 'initContoller - initTatumTRX', message: err.message });
        return undefined;
    }
}

exports.initTatumBSC = async () => {
    try {
        let bscSetting = await models.settingModel.exists({ key: 'BSCWalletInfo' });
        if (bscSetting === null) {
            let bscWallet = await tatumController.createBSCWallet();
            if (bscWallet === null) return console.error('initTatumBsc createBscWallet Error');

            let virtualAccount = await tatumController.createVirtualAccount({ xpub: bscWallet.xpub, coinType: 'BSC' });
            if (virtualAccount === null) return console.error('initTatumBsc createVirtualAccount Error');

            models.settingModel.create({ key: 'BSCWalletInfo', dataObject: { mnemonic: bscWallet.mnemonic, xpub: bscWallet.xpub, virtualAccount: virtualAccount } });
            console.log('BSCWalletInfo setting firstly saved');
        }
    }
    catch (err) {
        console.error({ title: 'initContoller - initTatumBSC', message: err.message });
        return undefined;
    }
}