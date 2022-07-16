const Expense = require('../models/expense');
const Income = require('../models/income');
const Wallet = require('../models/wallet');

exports.getIncome = (req,res,next) => {
    Wallet.fetchAll(req.user.id)
        .then(([rows, fieldData]) => {
            Income.fetchAll(req.user.id)
            .then(([rows_2, fieldData_2]) => {
                console.log(rows_2)
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
    console.log(req.body.wallet_id)
    const income = new Income(category_id,null,amount,note,date,wallet_id)
    res.redirect('/income')
    return income.save()
}

exports.getExpense = (req,res,next) => {
    Wallet.fetchAll()
        .then(([rows, fieldData]) => {
            Expense.fetchAll()
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
    res.redirect('/expense')
    return expense.save()
}

exports.getDetailsIncome = (req,res,next) => {
    res.render('income_details', {
        pageTitle: 'Income Details',
        user: req.user,
        path: '/incomeDetails'
    })
}

exports.postDetailsIncome = (req,res,next) => {}

exports.getDetailsExpense = (req,res,next) => {
    res.render('expense_details', {
        pageTitle: 'Expense Details',
        user: req.user,
        path: '/expenseDetails'
    })
}

exports.postDetailsExpense = (req,res,next) => {}