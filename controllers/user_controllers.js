const mysqlConnection = require('../connection');
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('signup');
}


// render the sign in page
module.exports.signIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login');
}

// // get the sign up data
module.exports.create = function(req, res){
    // TODO later
    if(req.body.password!=req.body.confirm){
        // req.flash('error', 'Passwords do not match');
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
                        password:req.body.password
            };
            mysqlConnection.query(sql,post,(err,result)=>{
                if(err){
                    console.log('User not created :: Error :',err);
                    return;
                }else{
                    return res.redirect('/users/sign-in');
                }

            });
        }else{
            return res.redirect('back');
        }
    });
}


// // sign in and create a session for the user
module.exports.createSession = function(req, res){
    // req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}
// signout
module.exports.destroySession = function(req, res){
    req.logout();
    // req.flash('success', 'You have logged out!');
    return res.redirect('/users/sign-in');
}