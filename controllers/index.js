const { recentExpenses } = require("../models/expense");
const Expense = require("../models/expense");
const User = require("../models/user");
const Wallet = require("../models/wallet");

exports.getIndex = (req,res,next) => {
    res.render('index',{
    });
}

exports.getDashboard = (req,res,next) => {
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
                                                                                                        Expense.recentExpenses(req.user.id)
                                                                                                        .then(([recentExpenses]) => {
                                                                                                            res.render('dashboard',{
                                                                                                                pageTitle: 'Dashboard',
                                                                                                                path: '/dashboard',
                                                                                                                user: req.user,
                                                                                                                income: income,
                                                                                                                expense: expense,
                                                                                                                recents: recentExpenses,
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
}

exports.getProfile = (req,res,next) => {
    if(req.user.dob!=null){
        req.user.dob = req.user.dob.toLocaleDateString();
    }
    res.render('profile',{
        pageTitle: 'Profile',
        user: req.user,
        path: '/profile'
    });
}

exports.postProfile = (req,res,next) => {
    res.redirect('/editProfile');
}

exports.getEditProfile = (req,res,next) => {
    if(req.user.dob!=null){
        req.user.dob = req.user.dob.toLocaleDateString();
    }
    res.render('edit_profile',{
        pageTitle: 'Edit Profile',
        user: req.user,
        path: '/editProfile'
    });
}

exports.postEditProfile = (req,res,next) => {
    const updatedUsername = req.body.username;
    const updatedEmail = req.body.email;
    const updatedFirstName = req.body.firstName;
    const updatedLastName = req.body.lastName;
    const updatedGender = req.body.gender;
    const updatedJob = req.body.job ;
    const updatedPhone = req.body.phone;
    let updatedDob = req.body.dob;
    const updatedFacebook = req.body.facebook;
    const updatedLinkedin = req.body.linkedin;
    const updatedAddress = req.body.address;
    
    // console.log(req.body);
    if(updatedDob === ''){
        updatedDob = null;
    }
    const user = new User(req.user.id,updatedUsername,updatedEmail,req.user.password,updatedFirstName,updatedLastName,updatedGender,updatedDob,updatedPhone,updatedJob,updatedFacebook,updatedLinkedin,updatedAddress);
    res.redirect('/profile');
    return user.update();
}