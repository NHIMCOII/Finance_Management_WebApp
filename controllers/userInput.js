const Expense = require('../models/expense');
const Income = require('../models/income');
const Wallet = require('../models/wallet');

exports.getIncome = (req,res,next) => {
    Wallet.fetchAll(req.user.id)
        .then(([rows, fieldData]) => {
            Income.fetchAll(req.user.id)
            .then(([rows_2, fieldData_2]) => {
                res.render('income',{
                    user: req.user,
                    wallets: rows,
                    incomes: rows_2,
                    pageTitle: 'Income',
                    path: '/income'
                });
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postIncome = (req,res,next) => {
    const category_id = req.body.category_id
    const amount = req.body.amount
    const note = req.body.note
    const date = req.body.date
    const wallet_id = req.body.wallet_id
    const income = new Income(category_id,null,amount,note,date,wallet_id)
    income.save()

    Wallet.findByPk(wallet_id)
    .then(([thisWallet]) => {
        const wallet = new Wallet(thisWallet[0].wallet_id,thisWallet[0].id,thisWallet[0].name,thisWallet[0].type,(Number(thisWallet[0].acc_balance) + Number(amount)),thisWallet[0].percentage,thisWallet[0].period)
        return wallet
    })
    .then(wallet => {
        return wallet.update()
    })
    .then(() => {
        return res.redirect('/income');
    })
    .catch(err => console.log(err))
}

exports.postDeleteIncome = (req,res,next) => {
    const income_id = req.body.income_id
    const wallet_id = req.body.wallet_id
    const amount = req.body.amount
    Income.deleteByIncomeID(income_id)
    .then(() => {
        Wallet.findByPk(wallet_id[0])
        .then(([thisWallet]) => {
            const wallet = new Wallet(thisWallet[0].wallet_id,thisWallet[0].id,thisWallet[0].name,thisWallet[0].type,(Number(thisWallet[0].acc_balance) - Number(amount)),thisWallet[0].percentage,thisWallet[0].period)
            return wallet
        })
        .then(wallet => {
            return wallet.update()
        })
    })
    .then(() => {
        return res.redirect('/income')
    })
    .catch(err => console.log(err))
}

exports.getExpense = (req,res,next) => {
    Wallet.fetchAll(req.user.id)
    .then(([rows, fieldData]) => {
        Expense.fetchAll(req.user.id)
        .then(([rows_2, fieldData_2]) => {
            res.render('expense',{
                user: req.user,
                wallets: rows,
                expenses: rows_2,
                pageTitle: 'Expense',
                path: '/expense'
            });
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postExpense = (req,res,next) => {
    const category_id = req.body.category_id
    const amount = req.body.amount
    const note = req.body.note
    const date = req.body.date
    const wallet_id = req.body.wallet_id
    const expense = new Expense(category_id,null,amount,note,date,wallet_id)
    expense.save()

    Wallet.findByPk(wallet_id)
    .then(([thisWallet]) => {
        const wallet = new Wallet(thisWallet[0].wallet_id,thisWallet[0].id,thisWallet[0].name,thisWallet[0].type,(Number(thisWallet[0].acc_balance) - Number(amount)),thisWallet[0].percentage,thisWallet[0].period)
        return wallet
    })
    .then(wallet => {
        return wallet.update()
    })
    .then(() => {
        return res.redirect('/expense');
    })
    .catch(err => console.log(err))
}

exports.postDeleteExpense = (req,res,next) => {
    const expense_id = req.body.expense_id
    const wallet_id = req.body.wallet_id
    const amount = req.body.amount
    Expense.deleteByExpenseID(expense_id)
    .then(() => {
        Wallet.findByPk(wallet_id[0])
        .then(([thisWallet]) => {
            const wallet = new Wallet(thisWallet[0].wallet_id,thisWallet[0].id,thisWallet[0].name,thisWallet[0].type,(Number(thisWallet[0].acc_balance) + Number(amount)),thisWallet[0].percentage,thisWallet[0].period)
            return wallet
        })
        .then(wallet => {
            return wallet.update()
        })
    })
    .then(() => {
        return res.redirect('/expense')
    })
    .catch(err => console.log(err))
}

exports.getDetailsIncome = (req,res,next) => {
    const income_id = req.params.income_id
    Income.findByIncomeID(income_id)
    .then(([income]) => {
        res.render('income_details', {
            pageTitle: 'Income Details',
            user: req.user,
            income: income[0],
            path: '/incomeDetails'
        })
    })
}

exports.postDetailsIncome = (req,res,next) => {}

exports.getDetailsExpense = (req,res,next) => {
    const expense_id = req.params.expense_id
    Expense.findByExpenseID(expense_id)
    .then(([expense]) => {
        res.render('expense_details', {
            pageTitle: 'Expense Details',
            user: req.user,
            expense: expense[0],
            path: '/expenseDetails'
        })
    })
}

exports.postDetailsExpense = (req,res,next) => {}