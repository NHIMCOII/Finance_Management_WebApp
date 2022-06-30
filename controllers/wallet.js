exports.getEditWallet = (req,res,next) => {
    res.render('editWallet',{
        isAuthenticated: req.session.isLoggedIn,
        username: req.session.user[0].username,
        pageTitle: 'Edit Wallet',
        path: '/editWallet'
    });
}

exports.postEditWallet = (req,res,next) => {}

exports.getMoneyTransfer = (req,res,next) => {
    res.render('moneyTransfer',{
        isAuthenticated: req.session.isLoggedIn,
        username: req.session.user[0].username,
        pageTitle: 'Money Transfer',
        path: '/moneyTransfer'
    });
}

exports.postMoneyTransfer = (req,res,next) => {}