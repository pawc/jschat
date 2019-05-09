var seq = require('../sequelize');

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
        }
    })
    .then(resultUsers => {
        var users = [];
        for(var i = 0; i < resultUsers.length; i++){
            users.push({
                login: resultUsers[i].user.login,
                name: resultUsers[i].name,
                city: resultUsers[i].city
            })
        }
        res.send(users);
    })
});

module.exports = {
    getUsers,
    getAllUsers
}