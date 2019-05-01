var seq = require('../sequelize.js');
var createError = require('http-errors');

const signinGet = ((req, res, next) => {
    res.render('signin');
});

const signinPost = ((req, res, next) => {
    var login = req.body.login;
    var password = req.body.password;

    if(login.length <= 3 || password.length <= 3){
        res.locals.message = 'Login and password need to be over 3 characters long.';
        res.locals.error = createError(406);
        res.status(res.locals.error.status || 406);
        res.render('error');
        return;
    }

    seq.authenticate(login, password, (result) => {

        if(result){
            req.session.loggedIn = true;
            req.session.login = login;
            res.redirect('/');
        }
        else{
            res.locals.message = 'Invalid authentication.';
            res.locals.error = createError(401);
            res.status(res.locals.error.status || 401);
            res.render('error');
        }

    })

});

module.exports = {
    signinGet,
    signinPost
}