const User = require('../models/user');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction')

exports.getIndex = (req,res,next) => {
    res.render('index');
}

exports.getDashboard = (req,res,next) => {
    req.user.populate('myWallets.list.wallet_id')
    .then(wallets => {
        // Transaction.getRecentTransactions(req.user._id)
        // .then(recents => {
    //         Transaction.getTotalIncomeByMonth(req.user._id)
    //         .then(incomes => {
    //             Transaction.getTotalExpenseByMonth(req.user._id)
    //             .then(expenses => {
                        res.render('dashboard',{
                        pageTitle: 'Dashboard',
                        path: '/dashboard',
                        user: req.user,
                        income: [],
                        expense: [],
                        recents: [],
                        wallets: wallets.myWallets.list
                        })
    //             })
    //         })
        // })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
}

exports.getProfile = (req,res,next) => {
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
    const updatedGender = Boolean(req.body.gender);
    const updatedJob = req.body.job ;
    const updatedPhone = req.body.phone;
    let updatedDob = req.body.dob;
    const updatedFacebook = req.body.facebook;
    const updatedLinkedin = req.body.linkedin;
    const updatedAddress = req.body.address;
    
    if(updatedDob === ''){
        updatedDob = null;
    }
    User.findById(req.user._id)
    .then(user => {
        user.username = updatedUsername
        user.email = updatedEmail
        user.firstName = updatedFirstName
        user.lastName = updatedLastName
        user.gender = updatedGender
        user.job = updatedJob
        user.phone = updatedPhone
        user.dob = updatedDob
        user.facebook = updatedFacebook
        user.linkedin = updatedLinkedin
        user.address = updatedAddress
        return user.save()
    })
    .then(result => {
        res.redirect('/profile');
    })
    .catch(err => console.log(err));
}