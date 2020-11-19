// Require modules
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/index');
const session = require('express-session');
const userRouter = require('./routes/users');
const authoriztion = require('./utils/authorization');

// Set up express app
const app = express();
// config env
require('dotenv').config();

// connect to DB
require('./config/database');

// configurethe app with app.set()
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// mounting authorization
app.use(authoriztion.addUserToRequest);

// Mount routes with app.use()
app.use('/', indexRouter);
app.use('/users', userRouter);

// Tell App to listen
app.listen(port, function() {
    console.log (`Express is listening on port: ${port}`);
});