const bcrypt = require('bcryptjs');

const User = require("../models/user");

exports.getLogin = (req,res,next) => {
    res.render('auth-login',{
        isAuthenticated: false,
        pagetitle: 'Login',
        path:'/login'
    });
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email)
    .then(user => {
        if(user[0].length === 0){
            return res.redirect('/login');
        }
        bcrypt
        .compare(password,user[0][0].password)
        .then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user[0];
                console.log(user);
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/dashboard');
                });
            }
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });
    })
    .catch(err => console.log(err));   
}

exports.postLogout = (req,res,next) => {
    req.session.destroy( err => {
        // console.log(err);
        res.redirect('/login');
    });
}

exports.getSignup = (req,res,next) => {
    res.render('auth-signup',{
        pagetitle: 'Signup',
        path:'/signup'
    });
}

exports.postSignup = (req,res,next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
  
    User
    .findByEmail(email)
    .then(userDoc => {
        if(userDoc[0].length != 0){
            return res.redirect('/signup');
        }
        return bcrypt
        .hash(password,12)
        .then(hashedPassword => {
            const user = new User(null,username,email,hashedPassword);
            return user.save();
        })
        .then( result => {
            res.redirect('/login');
        })
    })
    .catch(err => console.log(err));
    //Find existing user -> redirect '/signup' <auth>
    //else -> create new user & encryted password <auth> -> save ->redirect /login
}