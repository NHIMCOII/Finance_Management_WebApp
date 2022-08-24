const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 

const User = require("./models/user");


const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;

const MONGODB_URI = 
    // 'mongodb+srv://DuyAnh:Nhimcoi2002@cluster0.lbaw2w3.mongodb.net/fms';
    'mongodb://127.0.0.1:27017/fms';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transaction');
const walletRoutes = require('./routes/wallet');
const reportRoutes = require('./routes/report');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use( 
	session({
		secret: 'supersecret',
		resave: false,
		saveUninitialized: false,
        store: store
	})
); 

app.use(csrfProtection);
app.use(flash());

app.use((req,res,next) => {
	if(!req.session.user){
		return next(); 
	}
    User.findByPk(req.session.user._id)
    .then(user => { 
        req.user = new User(user.username,user.email,user.password,user.firstName,user.lastName,user.gender,user.dob,user.phone,user.job,user.facebook,user.linkedin,user.address,user.myWallets,user._id);
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
app.use(transactionRoutes);
app.use(walletRoutes); 
app.use(reportRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000); 
})

 