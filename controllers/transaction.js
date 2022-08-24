// const Transaction  = require('../models/transaction');
// const Wallet = require('../models/wallet');
// const Category = require('../models/category')

// ================== INCOMES ================

exports.getIncome = (req,res,next) => {
    Wallet.fetchAll(req.user._id)
        .then((wallets) => {    
            Transaction.fetchAllIncomes(req.user._id)  
            .then(incomes => {
                res.render('income',{
                    user: req.user,
                    wallets: wallets,
                    incomes: incomes ? incomes : [],
                    pageTitle: 'Income',
                    path: '/income'
                });
            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postIncome = (req,res,next) => {
    const category = req.body.category_id
    const amount = Number(req.body.amount)
    const note = req.body.note
    const date = req.body.date
    const wallet_id = req.body.wallet_id

    Category.findParent(category)
    .then(parent => {
        const income = new Transaction(req.user._id,wallet_id,category,amount,date,note,parent)
        income.save().then(income => {
            Wallet.findByPk(wallet_id)
            .then((thisWallet) => {
                const wallet = new Wallet(thisWallet.user_id,thisWallet.name,thisWallet.type,thisWallet.acc_balance + amount,thisWallet.percentage,thisWallet.period,thisWallet.note,thisWallet.transactions,thisWallet._id)
                return wallet
            })
            .then(wallet => {
                wallet.addToTransactions(income)
                res.redirect('/income');
            })
            .catch(err => console.log(err))
        })
    })
    
}

exports.getDetailsIncome = (req,res,next) => {
    const income_id = req.params.income_id
    Transaction.findByPk(income_id)
    .then((income) => {
        Wallet.findByPk(income.wallet_id)
        .then(wallet => {
            res.render('income_details', {
                pageTitle: 'Income Details',
                user: req.user,
                wallet: wallet,
                income: income,
                path: '/incomeDetails'
            })
        })
        .catch(err => console.log(err))
    })
}

exports.postDeleteIncome = (req,res,next) => {
    const income_id = req.body.income_id
    const wallet_id = req.body.wallet_id
    const amount = Number(req.body.amount)
    Transaction.deleteTransaction(income_id)
    
    Wallet.findByPk(wallet_id)
    .then((thisWallet) => {
        const wallet = new Wallet(thisWallet.user_id,thisWallet.name,thisWallet.type,thisWallet.acc_balance - amount,thisWallet.percentage,thisWallet.period,thisWallet.note,thisWallet.transactions,thisWallet._id)
        return wallet
    })
    .then(wallet => {
        wallet.deleteFromTransactions(income_id)
    })
    .then(() => {
        return res.redirect('/income')
    })
    .catch(err => console.log(err))
}


// ================== EXPENSES ================

exports.getExpense = (req,res,next) => {
    Wallet.fetchAll(req.user._id)
        .then((wallets) => {    
            Transaction.fetchAllExpenses(req.user._id)  
            .then(expenses => {
                res.render('expense',{
                    user: req.user,
                    wallets: wallets,
                    expenses: expenses ? expenses : [],
                    pageTitle: 'Expense',
                    path: '/expense'
                });
            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postExpense = (req,res,next) => {
    const category = req.body.category_id
    const amount = -Number(req.body.amount)
    const note = req.body.note
    const date = req.body.date
    const wallet_id = req.body.wallet_id

    Category.findParent(category)
    .then(parent => {
        const expense = new Transaction(req.user._id,wallet_id,category,amount,date,note,parent)
        expense.save().then(expense => {
            Wallet.findByPk(wallet_id)
            .then((thisWallet) => {
                const wallet = new Wallet(thisWallet.user_id,thisWallet.name,thisWallet.type,thisWallet.acc_balance + amount,thisWallet.percentage,thisWallet.period,thisWallet.note,thisWallet.transactions,thisWallet._id)
                return wallet
            })
            .then(wallet => {
                wallet.addToTransactions(expense)
                res.redirect('/expense');
            })
            .catch(err => console.log(err))
        })
    })
    
}

exports.getDetailsExpense = (req,res,next) => {
    const expense_id = req.params.expense_id
    Transaction.findByPk(expense_id)
    .then((expense) => {
        Wallet.findByPk(expense.wallet_id)
        .then(wallet => {
            res.render('expense_details', {
                pageTitle: 'Expense Details',
                user: req.user,
                wallet: wallet,
                expense: expense,
                path: '/expenseDetails'
            })
        })
        .catch(err => console.log(err))
    })
}

exports.postDeleteExpense = (req,res,next) => {
    const expense_id = req.body.expense_id
    const wallet_id = req.body.wallet_id
    const amount = Number(req.body.amount)
    Transaction.deleteTransaction(expense_id)
    Wallet.findByPk(wallet_id)
    .then((thisWallet) => {
        const wallet = new Wallet(thisWallet.user_id,thisWallet.name,thisWallet.type,thisWallet.acc_balance - amount,thisWallet.percentage,thisWallet.period,thisWallet.note,thisWallet.transactions,thisWallet._id)
        wallet.update()
        return wallet
    })
    .then(wallet => {
        wallet.deleteFromTransactions(expense_id)
    })
    .then(() => {
        return res.redirect('/expense')
    })
    .catch(err => console.log(err))
}

