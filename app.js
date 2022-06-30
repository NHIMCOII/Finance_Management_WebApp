const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const csrf = require('csurf');

const errorController = require('./controllers/error');

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '123456',
	database: 'db-project'
};

const app = express();
const sessionStore = new MySQLStore(options);
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

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

app.use(csrfProtection);
app.use((req,res,next) => {
	if(req.session.user === undefined){
		return next();
	}
    User.findByPk(req.session.user[0].id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use((req,res,next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
});

app.use(indexRoutes);
app.use(authRoutes);
app.use(userInputRoutes);
app.use(walletRoutes);
app.use(reportRoutes);

app.use(errorController.get404);


app.listen(3000);
