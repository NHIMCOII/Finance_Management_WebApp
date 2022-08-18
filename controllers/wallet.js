const Wallet = require("../models/wallet");
// const Income = require("../models/income");
// const Expense = require("../models/expense");

exports.getMyWallet = (req,res,next) => {
    Wallet.fetchAll(req.user._id)
    .then((result) => {
        res.render('myWallets',{
            user: req.user,
            wallets: result,
            pageTitle: 'My Wallet',
            path: '/myWallets'
        })
    })
    .catch(err => {
        console.log(err);
    });
}
 
exports.getAddWallet = (req,res,next) => {   
    res.render('addWallet',{
        user: req.user,
        pageTitle: 'Add Wallet',
        path: '/addWallet'
    })
}

exports.postAddWallet = (req,res,next) => {
    const type = req.body.type
    let acc_balance = req.body.acc_balance
    if(type == 'Debts'){
        acc_balance = -acc_balance
    }
    const name = req.body.name
    const percentage = req.body.percentage
    const period = req.body.period
    const wallet = new Wallet(req.user._id,name,type,acc_balance,percentage,period)
    wallet.save()
    .then(result => {
        res.redirect('/myWallets')
    })
    .catch(err => console.log(err))
}

exports.getEditWallet = (req,res,next) => {
    const wallet_id = req.params.wallet_id // wallet_id from routes
    Wallet.findByPk(wallet_id)
    .then((wallet) => {
        res.render('editWallet',{
            user: req.user,
            pageTitle: 'Edit Wallet',
            path: '/editWallet',
            wallet: wallet
        })
    })
}

exports.postEditWallet = (req,res,next) => {
    const wallet_id = req.body.wallet_id
    const type = req.body.type
    const name = req.body.name
    const acc_balance = req.body.acc_balance
    const percentage = req.body.percentage
    const period = req.body.period
    Wallet.findByPk(wallet_id)
    .then((thisWallet) => {
        const wallet = new Wallet(req.user._id,name,type,acc_balance,percentage,period)
        return wallet.update(wallet_id)
    })
    .then(result => {
        res.redirect('/myWallets')
    })
    .catch(err => console.log(err))
}

exports.getMoneyTransfer = (req,res,next) => {
    Wallet.fetchAll(req.user._id)
    .then((wallets) => {
        res.render('moneyTransfer',{
            user: req.user,
            wallets: wallets,
            pageTitle: 'Money Transfer',
            path: '/moneyTransfer'
        })
    })
    .catch(err => {
        console.log(err);
    });
    
}

exports.postMoneyTransfer = (req,res,next) => {
    const wallet_id_A = req.body.wallet_id_A
    const wallet_id_B = req.body.wallet_id_B
    const date = req.body.date
    const amount = req.body.amount
    const note = req.body.note
    // const income = new Income(1,null,amount,note,date,wallet_id_B) 
    // income.save()
    // const expense = new Expense(1,null,amount,note,date,wallet_id_A)
    // expense.save()
    // increase money in wallet B
    Wallet.findByPk(wallet_id_B)
    .then(thisWallet => {
        const wallet = new Wallet(thisWallet.user_id,thisWallet.name,thisWallet.type,(Number(thisWallet.acc_balance) + Number(amount)),thisWallet.percentage,thisWallet.period)
        return wallet
    })
    .then(wallet => {
        return wallet.update(wallet_id_B)
    })
    .catch(err => console.log(err))
    // reduce money in wallet A
    Wallet.findByPk(wallet_id_A)
    .then(thisWallet => {
        const wallet = new Wallet(thisWallet.user_id,thisWallet.name,thisWallet.type,(Number(thisWallet.acc_balance) - Number(amount)),thisWallet.percentage,thisWallet.period)
        return wallet
    })
    .then(wallet => {
        return wallet.update(wallet_id_A)
    })
    .then(() => {
        res.redirect('/myWallets')
    })
    .catch(err => console.log(err))
}

exports.postRemoveWallet = (req,res,next) => {
    const wallet_id = req.body.wallet_id
    Wallet.DeleteWallet(wallet_id)
    .then(() => {
        res.redirect('/myWallets')
    })
    .catch(err => console.log(err))
}