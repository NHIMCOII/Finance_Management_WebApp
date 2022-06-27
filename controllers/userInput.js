exports.getIncome = (req,res,next) => {
    res.render('income',{
        isAuthenticated: req.isloggedIn,
        pageTitle: 'Income',
        path: '/income'
    });
}

exports.postIncome = (req,res,next) => {}

exports.getExpense = (req,res,next) => {
    res.render('expense',{
        isAuthenticated: req.isloggedIn,
        pageTitle: 'Expense',
        path: '/expense'
    });
}

exports.postExpense = (req,res,next) => {}