const crypto = require('crypto');
const mysqlConnection = require('../connection');
module.exports.create = async function(req, res){

    let sql = 'INSERT INTO question SET ?';
            let post = {Question_id:crypto.randomBytes(64).toString('hex'),
                        Roll_Number:req.user.rollnum,
                        Content:req.body.content,
                        Creation_datetime:new Date(),
                        Name:req.user.name
            };
            mysqlConnection.query(sql,post,async function(err,result){
                if(err){
                    console.log('question not created :: Error :',err);
                    return;
                }else{
                    console.log(result);
                    req.flash('success','Question posted');
                    return res.redirect('back');
                    
                }

            });

}