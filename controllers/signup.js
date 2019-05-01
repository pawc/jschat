var seq = require('../sequelize.js');
var createError = require('http-errors');

const signupGet = ((req, res, next) => {
    res.render('signup');
});

const signupPost = ((req, res, next) => {
    var login = req.body.login;
    var password = req.body.password;

    if(login.length <= 3 || password.length <= 3){
        res.locals.message = 'Login and password need to be over 3 characters long.';
        res.locals.error = createError(406);
        res.status(res.locals.error.status || 406);
        res.render('error');
    }
    else{      
        seq.register(login, password);
        res.render('signin'); 
    }

});

module.exports = {
    signupGet,
    signupPost
}