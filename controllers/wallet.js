const Wallet = require("../models/wallet");
const Income = require("../models/income");
const Expense = require("../models/expense");

exports.getMyWallet = (req,res,next) => {
    Wallet.fetchAll(req.user.id)
    .then(([rows, fieldData]) => {
        res.render('myWallets',{
            user: req.user,
            wallets: rows,
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
    const wallet = new Wallet(null,req.user.id,name,type,acc_balance,percentage,period)
    wallet.save()
    return res.redirect('/myWallets')
}

exports.getEditWallet = (req,res,next) => {
    const wallet_id = req.params.wallet_id
    Wallet.findByPk(wallet_id)
    .then(([wallet]) => {
        res.render('editWallet',{
            user: req.user,
            pageTitle: 'Edit Wallet',
            path: '/editWallet',
            wallet: wallet[0]
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
    .then(([thisWallet]) => {
        const wallet = new Wallet(thisWallet[0].wallet_id,thisWallet[0].id,name,type,acc_balance,percentage,period)
        return wallet.update()
    })
    .then(() => {
        res.redirect('/myWallets')
    })
    .catch(err => console.log(err))
}

exports.getMoneyTransfer = (req,res,next) => {
    Wallet.fetchAll(req.user.id)
    .then(([rows, fieldData]) => {
        res.render('moneyTransfer',{
            user: req.user,
            wallets: rows,
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
    const income = new Income(1,null,amount,date,wallet_id_B) // 9: money transfer in dbo.category
    income.save()
    const expense = new Expense(1,null,amount,date,wallet_id_A)
    expense.save()
    // increase money in wallet B
    Wallet.findByPk(wallet_id_B)
    .then(([thisWallet]) => {
        const wallet = new Wallet(thisWallet[0].wallet_id,thisWallet[0].id,thisWallet[0].name,thisWallet[0].type,(Number(thisWallet[0].acc_balance) + Number(amount)),thisWallet[0].percentage,thisWallet[0].period)
        return wallet
    })
    .then(wallet => {
        return wallet.update()
    })
    .catch(err => console.log(err))
    // reduce money in wallet A
    Wallet.findByPk(wallet_id_A)
    .then(([thisWallet]) => {
        const wallet = new Wallet(thisWallet[0].wallet_id,thisWallet[0].id,thisWallet[0].name,thisWallet[0].type,(Number(thisWallet[0].acc_balance) - Number(amount)),thisWallet[0].percentage,thisWallet[0].period)
        return wallet
    })
    .then(wallet => {
        return wallet.update()
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
        return res.redirect('/myWallets')
    })
    .catch(err => console.log(err))
}