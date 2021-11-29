// import passport
const passport =require('passport');
// import passport's local strategy
const LocalStrategy =require('passport-local').Strategy;
// sql Connection
const mysqlConnection = require('../connection');
// passport local stratedy
passport.use(new LocalStrategy({
    // what is to be looked form the schema for the authentication 
    usernameField:'rollnum',
    passwordField:'password',
    // for enabaling req in the function
    passReqToCallback: true
    },
    // what to when input comes
    function(req,usernameField,passwordField,done){
        // look for the user with email in User db
        mysqlConnection.query("SELECT * from user where rollnum = ?",[usernameField],(err,result)=>{
            // console.log(result);
            if(err){
                console.log(`error while searching user in passort: ${err}`);
                return done(err);
            }
            // if logging in user enters wrong password
            if(result[0].password!=passwordField){
                console.log("Wrong Password");
                return done(null,false);
            }else{
                // if correct password then check for verification status
                if(result[0].isverified==1){
                    console.log(result[0]);
                    return done(null,result[0]);
                }else{
                    return done(null,false);
                }
                
            }
        });
    }
));
// serializing the user to decide which kep to be stored in the cokkie and encripted
passport.serializeUser(function(user,done){
    // console.log(user);
    done(null,user.rollnum);
});
// deserializing the user from the key in the cookie
passport.deserializeUser(function(rollnum,done){
    mysqlConnection.query("SELECT * from user where rollnum = ?",[rollnum],(err,result)=>{
        if(err){
            console.log('Error in finding the user :: Passport-deserialize');
            return done(err);
        }
        // console.log(result[0]);
        return done(null,result[0]);
       
    });
});

// check if the user is authenticated
// for putting the constraint on pages to load only when user is signed in
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}
// to access info for the request if the  user is signin via locals
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        // console.log(req.user);
        res.locals.user = req.user;
    }

    next();
}

module.exports=passport;
