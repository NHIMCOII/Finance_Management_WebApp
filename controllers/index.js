exports.getIndex = (req,res,next) => {
    res.render('index');
}

exports.getDashboard = (req,res,next) => {
    // console.log(req.isloggedIn);
    res.render('dashboard',{
        isAuthenticated: req.isloggedIn
    })
}