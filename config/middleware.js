module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'succes':req.flash('success'),
        'error':req.flash('error')
    }
    next();
};