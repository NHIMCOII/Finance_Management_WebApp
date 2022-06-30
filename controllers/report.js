exports.getMonthlyBalance = (req,res,next) => {
    res.render('monthlyBalance',{
        isAuthenticated: req.session.isLoggedIn,
        username: req.session.user[0].username,
        pageTitle: 'Monthly Balance',
        path: '/monthlyBalance'
    });
}