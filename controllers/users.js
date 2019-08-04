var seq = require('../sequelize');
var sequelize = require('sequelize');

const getUsers = ((req, res, next) => {
    res.render('users', {
        login: req.session.login
    });
});

const getAllUsers = ((req, res, next) => {
    seq.SignInLog.findAll({
        attributes: ['userId', [sequelize.fn('max', sequelize.col('date')), 'lastSignIn']],
        group: ['userId'],
        model: seq.SignInLog,
        include: {
            model: seq.User,
            attributes: ['login'],
            include: {
                model: seq.UserData,
                attributes: ['name', 'city']
            }
        }
    })
    .then(result => {
        res.send(result);
    })
   
});

const getUser = ((req, res, next) => {
    var login = req.params.login;

    seq.UserData.findOne({
        attributes: ['name', 'city'],
        include: {
            model: seq.User,
            attributes: ['login'],
            where: {
                login : login
            }
        }
    })
    .then((result) => {
        if(result){
            res.render('user', {
                login: result.user.login,
                name: result.name,
                city: result.city
            });
        }
        else{
            res.sendStatus(404);
        }

    })

});

module.exports = {
    getUsers,
    getAllUsers,
    getUser
}