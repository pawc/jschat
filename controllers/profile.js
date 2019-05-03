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
            city: userData.city,
            message: ''
        });
    
    })    


});

const updateProfile = ((req, res, next) => {

    seq.UserData.update({
        name: req.body.name,
        city: req.body.city
    },
    {
        returning: true,
        where: {
            userId: req.session.userId
        }
    })
    .then((rowsUpdated) => {
        var message = 'profile updated';
        if(rowsUpdated != ',1') message = 'problems updating your profile. Try again.';
        res.render('profile', {
            login: req.session.login,
            name: req.body.name,
            city: req.body.city,
            message: message
        });
    })

})

module.exports = {
    getProfile,
    updateProfile
}