const User = require('../models/user');
const Wallet = require('../models/wallet');
exports.getIndex = (req,res,next) => {
    res.render('index');
}

exports.getDashboard = (req,res,next) => {
    Wallet.fetchAll(req.user._id)
    .then(wallets => {
        res.render('dashboard',{
            pageTitle: 'Dashboard',
            path: '/dashboard',
            user: req.user,
            // income: income,
            // expense: expense,
            // recents: recentExpenses,
            wallets: wallets
        })
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
    const user = new User(updatedUsername,updatedEmail,req.user.password,updatedFirstName,updatedLastName,updatedGender,updatedDob,updatedPhone,updatedJob,updatedFacebook,updatedLinkedin,updatedAddress);
    user.update(req.user._id)
    .then(result => {
        res.redirect('/profile');
    })
    .catch(err => console.log(err));
}