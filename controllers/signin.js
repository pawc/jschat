var seq = require('../sequelize.js');
var crypto = require('../utils/crypto.js');
var createError = require('http-errors');

const signinGet = ((req, res, next) => {
    res.render('signin', {message: ''});
});

const signinPost = ((req, res, next) => {
    var login = req.body.login;
    var password = req.body.password;

    if(login.length <= 3 || password.length <= 3){
        res.render('signin', {message: 'Login and password need to be over 3 characters long.'});
       /* res.locals.message = 'Login and password need to be over 3 characters long.';
        res.locals.error = createError(406);
        res.status(res.locals.error.status || 406);
        res.render('error');*/
        return;
    }

    authenticate(login, password, (result) => {

        if(result){
            req.session.loggedIn = true;
            req.session.login = login;
            req.session.userId = result;
            seq.SignInLog.create({
                userId: result,
                date: new Date()
            });
            res.redirect('/board');
        }
        else{
            res.render('signin', {message: 'Invalid user or password. Try again.'});
            /*res.locals.message = 'Invalid authentication.';
            res.locals.error = createError(401);
            res.status(res.locals.error.status || 401);
            res.render('error');*/
        }

    })

});

const resetPassword = ((req, res, next) => {

    if(req.session.login != 'pawc'){
        next(createError(401));
        return;
    }

    var userId = req.query.userId;
    var password = req.query.password;

    if(password.length < 4){
        next(createError(400));
        return;
    }

    var salt = crypto.generateSalt(16);
    var newPassword = crypto.sha512(password, salt);

    seq.User.update({
        password: newPassword.passwordHash,
        salt: salt
    },
    {
        where: {
            id : userId
        }
    })
    .then(result => {
        res.send(result);
    })

});

const authenticate = ((login, password, result) => {
    seq.User.findOne({
        where: {
            login : login
        }
    })
    .then(resultUser => {
        if(!resultUser){
            result(null);
        }
        else{
            var computed = crypto.sha512(password, resultUser.salt);
        
            if(computed.passwordHash === resultUser.password){
                result(resultUser.id);
            }
            else{
                result(null);
            }
        }
    })
})

module.exports = {
    signinGet,
    signinPost,
    resetPassword,
}