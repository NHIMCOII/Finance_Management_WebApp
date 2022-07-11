exports.getMyWallet = (req,res,next) => {
    res.render('myWallet',{
        user: req.user,
        pageTitle: 'My Wallet',
        path: '/myWallet'
    });
}

exports.getAddWallet = (req,res,next) => {
    res.render('addWallet',{
        user: req.user,
        pageTitle: 'Add Wallet',
        path: '/addWallet'
    });
}

exports.postAddWallet = (req,res,next) => {
    res.redirect('/myWallet');
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