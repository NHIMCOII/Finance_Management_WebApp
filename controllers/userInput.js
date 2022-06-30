exports.getIncome = (req,res,next) => {
    res.render('income',{
        isAuthenticated: req.session.isLoggedIn,
        username: req.session.user[0].username,
        pageTitle: 'Income',
        path: '/income'
    });
}

exports.postIncome = (req,res,next) => {}

exports.getExpense = (req,res,next) => {
    res.render('expense',{
        isAuthenticated: req.session.isLoggedIn,
        username: req.session.user[0].username,
        pageTitle: 'Expense',
        path: '/expense'
    });
}

exports.postExpense = (req,res,next) => {}