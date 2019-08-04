var seq = require('../sequelize');
var sequelize = require('sequelize');

const getUsers = ((req, res, next) => {
    res.render('users', {
        login: req.session.login
    });
});

const getAllUsers = ((req, res, next) => {
    seq.SignInLog.findAll({
        attributes: ['userDatumId', [sequelize.fn('max', sequelize.col('date')), 'lastSignIn']],
        group: ['userDatumId'],
        model: seq.SignInLog,
        include: {
            model: seq.UserData,
            attributes: ['name', 'city'],
            include: {
                model: seq.User,
                attributes: ['login']
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