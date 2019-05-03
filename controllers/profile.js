var seq = require('../sequelize.js');

const getProfile = ((req, res, next) => {

    res.render('profile', {
        login: req.session.login
    });

});

module.exports = {
    getProfile
}