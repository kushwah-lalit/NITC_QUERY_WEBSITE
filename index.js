const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysqlConnection = require('./connection');
const app = express();
const port = 8000;
// use express session and passport config
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const crypto = require('crypto');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');


const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.static('./assets'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({
    name: 'nitcquerywebsite',
    // todo change secret before the deployment
    // secret:'blahsomething',@@@
    secret: 'anything',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
app.use('/', require('./routes/index'));
app.listen(port, function(err) {
    if (err) {
        console.log(`Error while runnning the server: ${err}`);
    }
    console.log(`Server running on port: ${port}`);
});