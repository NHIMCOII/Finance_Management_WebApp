const Expense = require('../models/expense')
const User = require('../models/user')
const Wallet = require('../models/wallet')

exports.getMonthlyBalance = (req,res,next) => {
    User.income_per_month(req.user.id, 1)
    .then(([Jan]) => {
        User.income_per_month(req.user.id, 2)
        .then(([Feb]) => {
            User.income_per_month(req.user.id, 3)
            .then(([Mar]) => {
                User.income_per_month(req.user.id, 4)
                .then(([Apr]) => {
                    User.income_per_month(req.user.id, 5)
                    .then(([May]) => {
                        User.income_per_month(req.user.id, 6)
                        .then(([Jun]) => {
                            User.income_per_month(req.user.id, 7)
                            .then(([Jul]) => {
                                User.income_per_month(req.user.id, 8)
                                .then(([Aug]) => {
                                    User.income_per_month(req.user.id, 9)
                                    .then(([Sep]) => {
                                        User.income_per_month(req.user.id, 10)
                                        .then(([Oct]) => {
                                            User.income_per_month(req.user.id, 11)
                                            .then(([Nov]) => {
                                                User.income_per_month(req.user.id, 12)
                                                .then(([Dec]) => {
                                                    User.expense_per_month(req.user.id, 1)
                                                    .then(([exJan]) => {
                                                        User.expense_per_month(req.user.id, 2)
                                                        .then(([exFeb]) => {
                                                            User.expense_per_month(req.user.id, 3)
                                                            .then(([exMar]) => {
                                                                User.expense_per_month(req.user.id, 4)
                                                                .then(([exApr]) => {
                                                                    User.expense_per_month(req.user.id, 5)
                                                                    .then(([exMay]) => {
                                                                        User.expense_per_month(req.user.id, 6)
                                                                        .then(([exJun]) => {
                                                                            User.expense_per_month(req.user.id, 7)
                                                                            .then(([exJul]) => {
                                                                                User.expense_per_month(req.user.id, 8)
                                                                                .then(([exAug]) => {
                                                                                    User.expense_per_month(req.user.id, 9)
                                                                                    .then(([exSep]) => {
                                                                                        User.expense_per_month(req.user.id, 10)
                                                                                        .then(([exOct]) => {
                                                                                            User.expense_per_month(req.user.id, 11)
                                                                                            .then(([exNov]) => {
                                                                                                User.expense_per_month(req.user.id, 12)
                                                                                                .then(([exDec]) => {
                                                                                                    Wallet.fetchAll(req.user.id)
                                                                                                    .then(([wallets]) => {
                                                                                                        let income = []
                                                                                                        let expense = []
                                                                                                        income.push(Jan[0].amount,Feb[0].amount,Mar[0].amount,Apr[0].amount,May[0].amount,Jun[0].amount,Jul[0].amount,Aug[0].amount,Sep[0].amount,Oct[0].amount,Nov[0].amount,Dec[0].amount)
                                                                                                        expense.push(exJan[0].amount,exFeb[0].amount,exMar[0].amount,exApr[0].amount,exMay[0].amount,exJun[0].amount,exJul[0].amount,exAug[0].amount,exSep[0].amount,exOct[0].amount,exNov[0].amount,exDec[0].amount)
                                                                                                        income.forEach((value,i,arr) => {                                                                                                        
                                                                                                            if (arr[i] == null ) {                                                                                                              
                                                                                                                arr[i] = 0;
                                                                                                            }
                                                                                                        })
                                                                                                        expense.forEach((value,i,arr) => {                                                                                                        
                                                                                                            if (arr[i] == null ) {                                                                                                              
                                                                                                                arr[i] = 0;
                                                                                                            }
                                                                                                        })                                                                                                  

                                                                                                        Expense.sumOfExpenseByCategory(req.user.id, 7)
                                                                                                        .then(([auto]) => {
                                                                                                            Expense.sumOfExpenseByCategory(req.user.id, 10)
                                                                                                            .then(([charity]) => {
                                                                                                                Expense.sumOfExpenseByCategory(req.user.id, 11)
                                                                                                                .then(([childcare]) => {
                                                                                                                    Expense.sumOfExpenseByCategory(req.user.id, 12)
                                                                                                                    .then(([education]) => {
                                                                                                                        Expense.sumOfExpenseByCategory(req.user.id, 13)
                                                                                                                        .then(([necessities]) => {
                                                                                                                            Expense.sumOfExpenseByCategory(req.user.id, 17)
                                                                                                                            .then(([entertainment]) => {
                                                                                                                                Expense.sumOfExpenseByCategory(req.user.id, 18)
                                                                                                                                .then(([health]) => {
                                                                                                                                    Expense.sumOfExpenseByCategory(req.user.id, 21)
                                                                                                                                    .then(([utilities]) => {
                                                                                                                                        Expense.sumOfExpenseByCategory(req.user.id, 2)
                                                                                                                                        .then(([others]) => {
                                                                                                                                            if(auto.length == 0){
                                                                                                                                                auto.push({total: null})
                                                                                                                                            }
                                                                                                                                            if(charity.length == 0){
                                                                                                                                                charity.push({total: null})
                                                                                                                                            }
                                                                                                                                            if(childcare.length == 0){
                                                                                                                                                childcare.push({total: null})
                                                                                                                                            }
                                                                                                                                            if(education.length == 0){
                                                                                                                                                education.push({total: null})
                                                                                                                                            }
                                                                                                                                            if(necessities.length == 0){
                                                                                                                                                necessities.push({total: null})
                                                                                                                                            }
                                                                                                                                            if(entertainment.length == 0){
                                                                                                                                                entertainment.push({total: null})
                                                                                                                                            }
                                                                                                                                            if(health.length == 0){
                                                                                                                                                health.push({total: null})
                                                                                                                                            }
                                                                                                                                            if(utilities.length == 0){
                                                                                                                                                utilities.push({total: null})
                                                                                                                                            }
                                                                                                                                            if(others.length == 0){
                                                                                                                                                others.push({total: null})
                                                                                                                                            }
                                                                                                                                            let category = []
                                                                                                                                            category.push(auto[0].total, charity[0].total, childcare[0].total, education[0].total, necessities[0].total, entertainment[0].total, health[0].total, utilities[0].total, others[0].total, auto[0].total + charity[0].total + childcare[0].total + education[0].total + necessities[0].total + entertainment[0].total + health[0].total + utilities[0].total + others[0].total)
                                                                                                                                            category.forEach((value, i, arr) => {
                                                                                                                                                if(arr[i] == null){
                                                                                                                                                    arr[i] = 0
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                            res.render('monthlyBalance',{
                                                                                                                                                pageTitle: 'Monthly Balance',
                                                                                                                                                path: '/monthlyBalance',
                                                                                                                                                user: req.user,
                                                                                                                                                income: income,
                                                                                                                                                expense: expense,
                                                                                                                                                category: category,
                                                                                                                                                wallets: wallets
                                                                                                                                            })
                                                                                                                                        })
                                                                                                                                    })
                                                                                                                                })
                                                                                                                            })
                                                                                                                        })
                                                                                                                    })
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    })
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}