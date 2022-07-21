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
    const name = req.body.name
    const acc_balance = req.body.acc_balance
    const percentage = req.body.percentage
    const period = req.body.period
    const wallet = new Wallet(null,req.user.id,name,type,acc_balance,percentage,period)
    res.redirect('/myWallets')
    return wallet.save()
}

exports.getEditWallet = (req,res,next) => {

    res.render('editWallet',{
        user: req.user,
        pageTitle: 'Edit Wallet',
        path: '/editWallet'
    })
}

exports.postEditWallet = (req,res,next) => {
    const type = req.body.type
    const name = req.body.name
    const acc_balance = req.body.acc_balance
    const percentage = req.body.percentage
    const period = req.body.period
    const wallet = new Wallet(null,req.user.id,name,type,acc_balance,percentage,period)
    res.redirect('/myWallets')
    return wallet.update()
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
    const note = req.body.note
    const income = new Income(9,null,amount,note,date,wallet_id_B) // 9: money transfer in dbo.category
    income.save()
    const expense = new Expense(9,null,amount,note,date,wallet_id_A)
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