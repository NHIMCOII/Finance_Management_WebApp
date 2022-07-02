exports.getMonthlyBalance = (req,res,next) => {
    res.render('monthlyBalance',{
        username: req.user.username,
        pageTitle: 'Monthly Balance',
        path: '/monthlyBalance'
    });
}