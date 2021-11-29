// import crypto to generate the random encrypted keys
const crypto = require('crypto');
// sql connection
const mysqlConnection = require('../connection');
// action to create the new question in the Db
module.exports.create = async function(req, res){
// sql query
    let sql = 'INSERT INTO question SET ?';
    // various fields given while creating question
            let post = {Question_id:crypto.randomBytes(64).toString('hex'),
            // local user rollnum
                        Roll_Number:req.user.rollnum,
                        Content:req.body.content,
                        // current date
                        Creation_datetime:new Date(),
                        // local user name
                        Name:req.user.name
            };
            // running query
            mysqlConnection.query(sql,post,async function(err,result){
                if(err){
                    console.log('question not created :: Error :',err);
                    req.flash('error','Question not posted');
                    return;
                }else{
                    console.log(result);
                    req.flash('success','Question posted');
                    return res.redirect('back');
                    
                }

            });

}
// action to delete the question and all the answers associated with it from the DB 
module.exports.destroy = async function(req,res){
    // query to delete with the the id fetched from the params on triggering delete btn
    // query to delete all the answer from the answer table with the same question id
    var sql = "DELETE FROM question where Question_id=?;DELETE FROM answer where Question_id=?";
    mysqlConnection.query(sql, [req.params.id,req.params.id], function(err, data, fields) {
        if(err){
            console.log(`Cant delete the Question ${err}`);
            req.flash('error','Question not deleted');
        }
        req.flash('success', 'Questions And Associated Answers deleted!');
        return res.redirect('back');
    });

}