module.exports.signUp = function(req,res){
    return res.render('signup',{
        title: "HomeScreen"
    });
}
module.exports.signIn = function(req,res){
    return res.render('login',{
        title: "HomeScreen"
    });
}