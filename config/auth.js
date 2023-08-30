module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated) {
            return next();
        }
        req.flash('error_msg', 'Please log ni to view this resource');
        res.redirect('/users/login');
    }
}