const User = require("../models/user");

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
                                                    let month = []
                                                    month.push(Jan[0].amount,Feb[0].amount,Mar[0].amount,Apr[0].amount,May[0].amount,Jun[0].amount,Jul[0].amount,Aug[0].amount,Sep[0].amount,Oct[0].amount,Nov[0].amount,Dec[0].amount)
                                                    res.render('dashboard',{
                                                        pageTitle: 'Dashboard',
                                                        path: '/dashboard',
                                                        user: req.user,
                                                        month: month 
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