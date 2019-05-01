var seq = require('../sequelize.js');
var createError = require('http-errors');

const signupGet = ((req, res, next) => {
    res.render('signup', {message: ''});
});

const signupPost = ((req, res, next) => {
    var login = req.body.login;
    var password = req.body.password;

    if(login.length <= 3 || password.length <= 3){
        res.render('signup', {message: 'Login and password need to be over 3 characters long.'});
        /*res.locals.message = 'Login and password need to be over 3 characters long.';
        res.locals.error = createError(406);
        res.status(res.locals.error.status || 406);
        res.render('error');*/
    }
    else{      
        seq.register(login, password, (result) => {
            if(result){
                res.render('signin', {message: ''}); 
            }
            else{
                res.render('signup', {message: 'User already exists.'}); 
            }
        });
    }

});

module.exports = {
    signupGet,
    signupPost
}