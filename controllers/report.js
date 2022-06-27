exports.getMonthlyBalance = (req,res,next) => {
    res.render('monthlyBalance',{
        isAuthenticated: req.isloggedIn,
        pageTitle: 'Monthly Balance',
        path: '/monthlyBalance'
    });
}