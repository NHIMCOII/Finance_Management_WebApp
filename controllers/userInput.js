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

exports.getDetailsIncome = (req,res,next) => {
    res.render('income_details', {
        pageTitle: 'Income Details',
        user: req.user,
        path: '/income/details'
    })
}

exports.postDetailsIncome = (req,res,next) => {}

exports.getDetailsExpense = (req,res,next) => {
    res.render('expense_details', {
        pageTitle: 'Expense Details',
        user: req.user,
        path: '/expense/details'
    })
}

exports.postDetailsExpense = (req,res,next) => {}