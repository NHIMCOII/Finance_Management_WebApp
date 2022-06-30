exports.getIndex = (req,res,next) => {
    res.render('index',{
    });
}

exports.getDashboard = (req,res,next) => {;
    res.render('dashboard',{
        pageTitle: 'Dashboard',
        path: '/dashboard',
        username: req.session.user[0].username,
        isAuthenticated: req.session.isLoggedIn,
        csrfToken: req.csrfToken()
    })
}

exports.getProfile = (req,res,next) => {
    res.render('profile',{
        isAuthenticated: req.session.isLoggedIn,
        pageTitle: 'Profile',
        username: req.session.user[0].username,
        path: '/profile'
    });
}