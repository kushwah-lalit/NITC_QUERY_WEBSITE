// import the sendgrid mailing engine
const sgMail = require('@sendgrid/mail');
// sendgrid api key for connection
sgMail.setApiKey('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');
// crypto to generate the random unique encrypted keys
const crypto = require('crypto');
// sql connection
const mysqlConnection = require('../connection');
//  action to render the signup page only on check that there in no user in local i.e cookie
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('signup',{title: 'Sign Up'});
}


// render the sign in page
//  action to render the signin page only on check that there in no user in local i.e cookie
module.exports.signIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login',{title: 'Sign In'});
}

//  action to create new user with data from the form
module.exports.create = function(req, res){
    //check does the password and confirm password field matches
    if(req.body.password!=req.body.confirm){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    // once matches then check in DB that whether the user already exists or not
    mysqlConnection.query("SELECT * from user where rollnum = ?",[req.body.rollnum],(err,result)=>{
        if(err){
            console.log(`error while creating user search part: ${err}`);
            return;
        }
        console.log(result);
        // if doesn't exists then registe him
        if(result.length==0){
            // sql query with the fields to be inserted
            let sql = 'INSERT INTO user SET ?';
            let post = {rollnum:req.body.rollnum,
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password,
                        // temporary emailtoken for verification
                        emailtoken:crypto.randomBytes(64).toString('hex')
            };
            // run the query
            mysqlConnection.query(sql,post,async function(err,result){
                if(err){
                    console.log('User not created :: Error :',err);
                    return;
                }else{
            // once inserted then trigger the sendgrid to send the mail
                    const msg = {
                        to: post.email, // Change to your recipient
                        from: 'projectmailer.tester@gmail.com', // Change to your verified sender
                        subject: 'Welcome to NITC Query Website - Verify your Email',
                        text: `Hello Thanks to reqister to our website.
                        Please copy and paste the address below to verify your account.
                        http://${req.headers.host}/verify-email?token=${post.emailtoken}`,
                        html: `<h1>Hello! Welcome to NITC Query Website</h1>
                        <p>Thanks for Registering</p>
                        <p>Please click the below link to verify your account</p>
                        <a href="http://${req.headers.host}/users/verify-email?token=${post.emailtoken}">Verify Account</a>
                        `,
                      }
                      try{
                        await sgMail.send(msg);
                        req.flash('success','Signed Up Successfully : Verify Email ID on registered email to Sign In');
                        // mail send then bring back user to signin page
                        return res.redirect('/users/sign-in');
                      }catch(err){
                          console.log(`Error on mail sendig : ${err}`);
                          req.flash('error','Verification mail cannot be sent contact Admin');
                        //   else error in sending the mail then back to signup page
                          return res.redirect('users/sign-up');

                      }
                    
                    
                }

            });
        }else{
            req.flash('error','User already exists');
            // user exists then back to signup page
            return res.redirect('back');
        }
    });
}
// action to verify user from the mail
module.exports.verifyEmail = function(req,res){
    // sql query to search for the user with the email token got from the query
    mysqlConnection.query("SELECT * from user where emailtoken = ?",[req.query.token],(err,result)=>{
        if(err){
            console.log(`Error on searching user: verfiy email stage::${err}`);

        }
        // if not user then user cant be verified hence back to signup page
        if(result.length==0){
            console.log(`Cant verify as token is invalid`);
            req.flash('error','Verified Failed');
            return res.redirect('/users/sign-up');
        }else{
            // if found the update the user's emailtoken field to null and the verification filed to 1 which was 0 by default
            mysqlConnection.query('UPDATE user SET ? WHERE emailtoken = ?',[{emailtoken:null,isverified:1},req.query.token]);
            req.flash('success','Successfully Verified');
            // back to signin page
            return res.redirect('/users/sign-in');
        }
    });

};

// // sign in and create a session for the user i.e login which is handeled by the passport local strategy
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}
// signout
// delete the user from local i.e cookie and back to signin page
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/users/sign-in');
}