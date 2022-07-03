exports.getEditWallet = (req,res,next) => {
    res.render('editWallet',{
        user: req.user,
        pageTitle: 'Edit Wallet',
        path: '/editWallet'
    });
}

exports.postEditWallet = (req,res,next) => {}

exports.getMoneyTransfer = (req,res,next) => {
    res.render('moneyTransfer',{
        user: req.user,
        pageTitle: 'Money Transfer',
        path: '/moneyTransfer'
    });
}

exports.postMoneyTransfer = (req,res,next) => {}