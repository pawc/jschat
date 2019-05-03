var seq = require('../sequelize.js');

const getProfile = ((req, res, next) => {

    seq.UserData.findOne({
        attributes: ['name', 'city'],
        where: {
            userId : req.session.userId
        }
    })
    .then((userData) => {
        res.render('profile', {
            login: req.session.login,
            name: userData.name,
            city: userData.city
        });
    
    })    


});

module.exports = {
    getProfile
}