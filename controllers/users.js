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
        group: ['signInLog.userId', 'user.id', 'user.login', 'user->userDatum.id', 'user->userDatum.name', 'user->userDatum.city'],
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

    seq.User.findOne({
        attributes: ['id', 'login'],
        where: {
            login: login
        },
        include: {
            model: seq.UserData,
            attributes: ['name', 'city']
        }
    })
    .then((result) => {
        if(result){
            res.render('user', {
                login: result.login,
                name: result.userDatum.name,
                city: result.userDatum.city
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