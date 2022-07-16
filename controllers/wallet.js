const Wallet = require("../models/wallet");

exports.getMyWallet = (req,res,next) => {
    Wallet.fetchAll(req.user.id)
    .then(([rows, fieldData]) => {
        res.render('myWallet',{
            user: req.user,
            wallets: rows,
            pageTitle: 'My Wallet',
            path: '/myWallet'
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
    res.redirect('/myWallet')
    return wallet.save()
}

exports.getMoneyTransfer = (req,res,next) => {
    res.render('moneyTransfer',{
        user: req.user,
        pageTitle: 'Money Transfer',
        path: '/moneyTransfer'
    });
}

exports.postMoneyTransfer = (req,res,next) => {
    res.redirect('/myWallet');
}