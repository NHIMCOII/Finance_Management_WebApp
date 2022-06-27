exports.getIndex = (req,res,next) => {
    res.render('index');
}

exports.getDashboard = (req,res,next) => {
    // console.log(req.isloggedIn);
    res.render('dashboard',{
        isAuthenticated: req.isloggedIn,
        pageTitle: 'Dashboard',
        path: '/dashboard'
    })
}

exports.getProfile = (req,res,next) => {
    res.render('profile',{
        isAuthenticated: req.isloggedIn,
        pageTitle: 'Profile',
        path: '/profile'
    });
}