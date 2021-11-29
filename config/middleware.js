// middleware that is ran to store the flash message from all the controllers in locals
module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'succes':req.flash('success'),
        'error':req.flash('error')
    }
    next();
};