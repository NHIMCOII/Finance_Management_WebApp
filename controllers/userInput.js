exports.getIncome = (req,res,next) => {
    res.render('income',{
        user: req.user,
        pageTitle: 'Income',
        path: '/income'
    });
}

exports.postIncome = (req,res,next) => {}

exports.getExpense = (req,res,next) => {
    res.render('expense',{
        user: req.user,
        pageTitle: 'Expense',
        path: '/expense'
    });
}

exports.postExpense = (req,res,next) => {}