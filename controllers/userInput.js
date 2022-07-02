exports.getIncome = (req,res,next) => {
    res.render('income',{
        username: req.user.username,
        pageTitle: 'Income',
        path: '/income'
    });
}

exports.postIncome = (req,res,next) => {}

exports.getExpense = (req,res,next) => {
    res.render('expense',{
        username: req.user.username,
        pageTitle: 'Expense',
        path: '/expense'
    });
}

exports.postExpense = (req,res,next) => {}