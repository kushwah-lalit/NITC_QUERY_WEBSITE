const crypto = require('crypto');
const mysqlConnection = require('../connection');
module.exports.create = async function(req, res){

    let sql = 'INSERT INTO answer SET ?';
            let post = {Answer_id:crypto.randomBytes(64).toString('hex'),
                        Question_id:req.body.post,
                        Roll_Number:req.user.rollnum,
                        Content:req.body.content,
                        Creation_datetime:new Date(),
                        Name:req.user.name
            };
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
module.exports.destroy = async function(req,res){
    mysqlConnection.query("DELETE from answer where Answer_id= ?",[req.params.id],(err,result)=>{
        if(err){
            console.log(`Cant delete the comment ${err}`);
            req.flash('error','Answer not deleted');
        }
        req.flash('success', 'Answer deleted!');
        return res.redirect('back');

    });
}