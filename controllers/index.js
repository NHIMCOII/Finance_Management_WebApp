exports.getIndex = (req,res,next) => {
    res.render('index',{
    });
}

exports.getDashboard = (req,res,next) => {
    res.render('dashboard',{
        pageTitle: 'Dashboard',
        path: '/dashboard',
        username: req.user.username,
    })
}

exports.getProfile = (req,res,next) => {
    res.render('profile',{
        pageTitle: 'Profile',
        username: req.session.user[0].username,
        path: '/profile'
    });
}