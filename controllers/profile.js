var seq = require('../sequelize.js');
var crypto = require('../utils/crypto.js');

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

const changePassword = ((req, res, next) => {

    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;

    if(newPassword.length <= 3){
        res.render('profile', {
            login: req.session.login,
            name: req.body.name,
            city: req.body.city,
            message: 'new password is too short (need over 3 characters)'
        });
    }
    else{
        seq.User.findOne({
            where: {
                id: req.session.userId
            }
        })
        .then((resultUser) => {
            var oldPasswordObject = crypto.sha512(oldPassword, resultUser.salt); 
            if(resultUser.password == oldPasswordObject.passwordHash){
                salt = crypto.generateSalt(16);
                passwordObject = crypto.sha512(newPassword, salt);
                seq.User.update({
                    password: passwordObject.passwordHash,
                    salt: salt
                },
                {
                    returning: true,
                    where: {
                        id : resultUser.id
                    }
                })
                .then((rowsUpdated) => {
                    if(rowsUpdated == ',1'){
                        res.render('profile', {
                            login: req.session.login,
                            name: req.body.name,
                            city: req.body.city,
                            message: 'password updated successfully'
                        });
                    }
                    else{
                        res.render('profile', {
                            login: req.session.login,
                            name: req.body.name,
                            city: req.body.city,
                            message: 'problems updating password'
                        })
                    }
                })
            }
            else{
                res.render('profile', {
                    login: req.session.login,
                    name: req.body.name,
                    city: req.body.city,
                    message: 'invalid password.'
                })
            }
        })
    }

    
})

module.exports = {
    getProfile,
    updateProfile,
    changePassword
}