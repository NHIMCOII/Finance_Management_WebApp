exports.getLogin = (req,res,next) => {
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[0]
    // .trim()
    // .split('=')[1];
    // console.log(isLoggedIn);
    res.render('auth-login',{
        isAuthenticated: req.isLoggedIn
    });
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    //find user by email
    // check password 
    //-> wrong then redirect /login
    //-> correct then redirect /dashboard
    req.session.isLoggedIn = true;
    
    res.redirect('/dashboard');        
}

exports.postLogout = (req,res,next) => {
    req.session.destroy( err => {
        // console.log(err);
        res.redirect('/login');
    });
}

exports.getSignup = (req,res,next) => {
    res.render('auth-signup');
}

exports.postSignup = (req,res,next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    //Find existing user -> redirect '/signup' <auth>
    //else -> create new user & encryted password <auth> -> save ->redirect /login
    res.redirect('/login');
}