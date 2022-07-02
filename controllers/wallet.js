exports.getEditWallet = (req,res,next) => {
    res.render('editWallet',{
        username: req.user.username,
        pageTitle: 'Edit Wallet',
        path: '/editWallet'
    });
}

exports.postEditWallet = (req,res,next) => {}

exports.getMoneyTransfer = (req,res,next) => {
    res.render('moneyTransfer',{
        username: req.user.username,
        pageTitle: 'Money Transfer',
        path: '/moneyTransfer'
    });
}

exports.postMoneyTransfer = (req,res,next) => {}