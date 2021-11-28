const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const crypto = require('crypto');
const mysqlConnection = require('../connection');
const router = require('../routes/user');
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('signup',{title: 'Sign Up'});
}


// render the sign in page
module.exports.signIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login',{title: 'Sign In'});
}

// // get the sign up data
module.exports.create = function(req, res){
    // TODO later
    if(req.body.password!=req.body.confirm){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    mysqlConnection.query("SELECT * from user where rollnum = ?",[req.body.rollnum],(err,result)=>{
        if(err){
            console.log(`error while creating user search part: ${err}`);
            return;
        }
        console.log(result);
        if(result.length==0){
            let sql = 'INSERT INTO user SET ?';
            let post = {rollnum:req.body.rollnum,
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password,
                        emailtoken:crypto.randomBytes(64).toString('hex')
            };
            mysqlConnection.query(sql,post,async function(err,result){
                if(err){
                    console.log('User not created :: Error :',err);
                    return;
                }else{
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
                        return res.redirect('/users/sign-in');
                      }catch(err){
                          console.log(`Error on mail sendig : ${err}`);
                          req.flash('error','Verification mail cannot be sent contact Admin');
                          return res.redirect('users/sign-up');

                      }
                    
                    
                }

            });
        }else{
            req.flash('error','User already exists');
            return res.redirect('back');
        }
    });
}
module.exports.verifyEmail = function(req,res){
    mysqlConnection.query("SELECT * from user where emailtoken = ?",[req.query.token],(err,result)=>{
        if(err){
            console.log(`Error on searching user: verfiy email stage::${err}`);

        }
        if(result.length==0){
            console.log(`Cant verify as token is invalid`);
            req.flash('error','Verified Failed');
            return res.redirect('/users/sign-up');
        }else{
            mysqlConnection.query('UPDATE user SET ? WHERE emailtoken = ?',[{emailtoken:null,isverified:1},req.query.token]);
            req.flash('success','Successfully Verified');
            return res.redirect('/users/sign-in');
        }
    });

};

// // sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}
// signout
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/users/sign-in');
}