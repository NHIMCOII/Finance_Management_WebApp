exports.getEditWallet = (req,res,next) => {
    res.render('editWallet',{
        isAuthenticated: req.isloggedIn,
        pageTitle: 'Edit Wallet',
        path: '/editWallet'
    });
}

exports.postEditWallet = (req,res,next) => {}

exports.getMoneyTransfer = (req,res,next) => {
    res.render('moneyTransfer',{
        isAuthenticated: req.isloggedIn,
        pageTitle: 'Money Transfer',
        path: '/moneyTransfer'
    });
}

exports.postMoneyTransfer = (req,res,next) => {}