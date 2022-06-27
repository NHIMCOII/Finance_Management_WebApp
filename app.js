const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userInputRoutes = require('./routes/userInput');
const walletRoutes = require('./routes/wallet');
const reportRoutes = require('./routes/report');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}));

app.use(indexRoutes);
app.use(authRoutes);
app.use(userInputRoutes);
app.use(walletRoutes);
app.use(reportRoutes);

app.use(errorController.get404);


app.listen(3000);
