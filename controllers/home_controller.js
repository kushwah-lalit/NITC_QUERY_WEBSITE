const mysqlConnection = require('../connection');
module.exports.home = function(req,res){
    return res.render('home',{
        title:'HomeScreen'
    });
}