const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 

const User = require("./models/user");
// const Category = require('./models/category')
// Category.insertMany([
//                 {category: "Money Transfer", parent: 0},
//                 {category: "Others", parent: 9},
//                 {category: "Salary", parent: 0},
//                 {category: "Bonus", parent: 0},
//                 {category: "Investment Interest", parent: 0},
//                 {category: "Gifts", parent: 0},       
//                 {category: "Gas", parent: 1},
//                 {category: "Auto Service", parent: 1},
//                 {category: "Charity", parent: 2},
//                 {category: "Childcare", parent: 3},
//                 {category: "Education", parent: 4},
//                 {category: "Clothing", parent: 5},
//                 {category: "Groceries", parent: 5},
//                 {category: "Household", parent: 5},
//                 {category: "Entertainment", parent: 6},
//                 {category: "Medical", parent: 7},
//                 {category: "Health & Fitness", parent: 7},
//                 {category: "Cable TV", parent: 8},
//                 {category: "Electric", parent: 8},
//                 {category: "Internet", parent: 8},
//                 {category: "Telephone", parent: 8},
//                 {category: "Water", parent: 8},
// ])
        

const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
// const mongoConnect = require('./utils/database').mongoConnect;

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
    User.findById(req.session.user._id)
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
app.use(transactionRoutes);
app.use(walletRoutes); 
app.use(reportRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(3000)
})
.catch(err => console.log(err))

 