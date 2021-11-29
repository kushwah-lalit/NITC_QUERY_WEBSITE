// impport to generate random encrypted keys
const crypto = require('crypto');
// sql connection
const mysqlConnection = require('../connection');
// action that  creates the answer
module.exports.create = async function(req, res){
// sql query
    let sql = 'INSERT INTO answer SET ?';
    // various data to insert
            let post = {Answer_id:crypto.randomBytes(64).toString('hex'),
                        Question_id:req.body.post,
                        // local user rollnum
                        Roll_Number:req.user.rollnum,
                        Content:req.body.content,
                        // current date
                        Creation_datetime:new Date(),
                        // local user name
                        Name:req.user.name
            };
            // run query
            mysqlConnection.query(sql,post,async function(err,result){
                if(err){
                    console.log('answer not created :: Error :',err);
                    req.flash('error','Answer not posted');
                    return;
                }else{
                    console.log(result);
                    req.flash('success','Answer posted');
                    return res.redirect('back');
                    
                }

            });


        }
        // action to destroy answer
module.exports.destroy = async function(req,res){
    // query to delete the answer with the id fetched fom the params on triggering the btn
    mysqlConnection.query("DELETE from answer where Answer_id= ?",[req.params.id],(err,result)=>{
        if(err){
            console.log(`Cant delete the comment ${err}`);
            req.flash('error','Answer not deleted');
        }
        req.flash('success', 'Answer deleted!');
        return res.redirect('back');

    });
}