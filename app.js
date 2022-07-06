const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

//! session
const MSSQLStore = require('connect-mssql-v2');
const config = require('./utils/dbconfig');
//!

const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');

const app = express();
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userInputRoutes = require('./routes/userInput');
const walletRoutes = require('./routes/wallet');
const reportRoutes = require('./routes/report');
const User = require('./models/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const options = {
    table: 'sessions',
    autoRemove: true,
    useUTC: true
}

const store = new MSSQLStore(config, options);

app.use(
	session({
		store: store, // options are optional
		secret: 'supersecret',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(csrfProtection);
app.use(flash());

app.use((req,res,next) => {
	if(req.session.user === undefined){
		return next();
	}
    User.findByPk(req.session.user[0].id)
    .then(user => {
        req.user = user[0][0];
        next();
    })
    .catch(err => console.log(err));
})

app.use((req,res,next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
});

store.on('connect', () => {
    console.log('connection established');
    //console.log(err);
})
store.on('error', (error) => {
    console.log(error);
    console.log('connection error');

})
store.on('sessionError', (error, classMathod) => {
    console.log('eternal error');
    console.log(classMathod);
    console.log('\n\n\nerror\n\n\n')
    console.log(error);
})

app.use(indexRoutes);
app.use(authRoutes);
app.use(userInputRoutes);
app.use(walletRoutes);
app.use(reportRoutes);

app.use(errorController.get404);


app.listen(3000);
