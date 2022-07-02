const bcrypt = require('bcryptjs');
const {validationResult} =require('express-validator/check');

const User = require("../models/user");

exports.getLogin = (req,res,next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth-login',{
        pageTitle: 'Login',
        path:'/login',
        errorMessage: message
    });
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email)
    .then(user => {
        if(user[0].length === 0){
            req.flash('error','Invalid email or password');
            return res.redirect('/login');
        }
        bcrypt
        .compare(password,user[0][0].password)
        .then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user[0];
                return req.session.save(err => {
                    // console.log(err);
                    res.redirect('/dashboard');
                });
            }
            req.flash('error','Invalid email or password');
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
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth-signup',{
        pageTitle: 'Signup',
        path:'/signup',
        errorMessage: message
    });
}

exports.postSignup = (req,res,next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('auth-signup',{
            pageTitle: 'Signup',
            path:'/signup',
            errorMessage: errors.array()[0].msg
        });
    }

    User
    .findByEmail(email)
    .then(userDoc => {
        if(userDoc[0].length != 0){
            req.flash('error','Email already exist ! Please choose a different one ');
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
}

exports.getReset = (req,res,next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth-reset-password',{
        pageTitle: 'Reset Password',
        path:'/reset',
        errorMessage: message
    });
}

exports.postReset = (req,res,next) => {
    res.redirect('/login');
}