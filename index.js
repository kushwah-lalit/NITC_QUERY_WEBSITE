// import empress framework
const express = require('express');
// import sql
const mysql = require('mysql');
// import body paser to handel the handel from the middleware
const bodyParser = require('body-parser');
// import the cookie pasrser to handel the cookie data
const cookieParser = require('cookie-parser');
// import sql connection file
const mysqlConnection = require('./connection');
// run epxress make app
const app = express();
// decide port
const port = 8000;
// use express session to store the local user data in express session and passport config
const session = require('express-session');
const passport = require('passport');
// import passport local startegy
const passportLocal = require('./config/passport-local-strategy');
// import sendgrid amiling engine
const sgMail = require('@sendgrid/mail');
// sendgrid api key for the connection validation
sgMail.setApiKey('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');
// import crypto to generate the encryptted unique keys
const crypto = require('crypto');
// import flash to store the flash messages
const flash = require('connect-flash');
// import the different middleware from the locations
const customMiddleware = require('./config/middleware');
// import express layouts to enable the feature to break pages to render in layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
// allow scripts and styles of diferent pages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// use the defined location to get the static files like css,images
app.use(express.static('./assets'));
// setting view engine to be ejs so as to enable writing the javascript in html
app.set('view engine', 'ejs');
// use path for the views
app.set('views', './views');
// to convert the data handel into json objects
app.use(express.json());
app.use(express.urlencoded());
// use and call cookie parser
app.use(cookieParser());
// create seesion and cookie time setting
app.use(session({
    name: 'nitcquerywebsite',
    secret: 'anything',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
}));
// use and calling passport
app.use(passport.initialize());
app.use(passport.session());
// calling the defined middleware
app.use(passport.setAuthenticatedUser);
// calling flash
app.use(flash());
// calling setflash middleware to set flash messages to local
app.use(customMiddleware.setFlash);
//defining the path for the routes files
app.use('/', require('./routes/index'));
// runnig the server on the defined port
app.listen(port, function(err) {
    if (err) {
        console.log(`Error while runnning the server: ${err}`);
    }
    console.log(`Server running on port: ${port}`);
});