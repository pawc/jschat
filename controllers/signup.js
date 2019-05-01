var seq = require('../sequelize.js');

const signupGet = ((req, res, next) => {
    res.render('signup');
});

const signupPost = ((req, res, next) => {
    var login = req.body.login;
    var password = req.body.password;
    seq.register(login, password);
    res.render('signin');
});

module.exports = {
    signupGet,
    signupPost
}