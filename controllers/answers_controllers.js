const crypto = require('crypto');
const mysqlConnection = require('../connection');
module.exports.create = async function(req, res){

    let sql = 'INSERT INTO answer SET ?';
            let post = {Answer_id:crypto.randomBytes(64).toString('hex'),
                        Question_id:req.body.post,
                        Roll_Number:req.user.rollnum,
                        Content:req.body.content,
                        Creation_datetime:new Date()
            };
            mysqlConnection.query(sql,post,async function(err,result){
                if(err){
                    console.log('answer not created :: Error :',err);
                    return;
                }else{
                    console.log(result);
                    req.flash('success','Question posted');
                    return res.redirect('back');
                    
                }

            });

}