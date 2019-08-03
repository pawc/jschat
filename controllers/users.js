var seq = require('../sequelize');
//var sequelize = require('sequelize');

const getUsers = ((req, res, next) => {
    res.render('users', {
        login: req.session.login
    });
});

const getAllUsers = ((req, res, next) => {
    seq.UserData.findAll({
        attributes: ['name', 'city'],
        include: {
            attributes: ['login'],
            model: seq.User    
            /*include: {
                attributes: [sequelize.fn('max', sequelize.col('data')), 'max'],
                model: seq.SignInLog,
            }*/
        }
    })
    .then(resultUsers => {
        var users = [];
        for(var i = 0; i < resultUsers.length; i++){
            users.push({
                login: resultUsers[i].user.login,
                name: resultUsers[i].name,
                city: resultUsers[i].city,
                lastSignIn: resultUsers[i].lastSignIn
            })
        }
        res.send(users);
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