exports.getIndex = (req,res,next) => {
    res.render('index');
}

exports.getSignIn = (req,res,next) => {
    res.render('auth-signin');
}
exports.getSignUp = (req,res,next) => {
    res.render('auth-signup');
}