exports.getMonthlyBalance = (req,res,next) => {
    res.render('monthlyBalance',{
        user: req.user,
        pageTitle: 'Monthly Balance',
        path: '/monthlyBalance'
    });
}