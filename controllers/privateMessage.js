var seq = require('../sequelize.js');
const Op = require('sequelize').Op;
var createError = require('http-errors');

const getPrivateMessages = ((req, res, next) => {

    var user1 = req.param('user1');
    var user2 = req.param('user2');

    if(!(req.session.userId == user1 || req.session.userId == user2)){
        res.locals.message = 'Invalid authentication.';
        res.locals.error = createError(401);
        res.status(res.locals.error.status || 401);
        res.render('error');
    }

    seq.PrivateMessage.findAll({
        where: {  
            recipient: {
                [Op.or]: [user1, user2]
            },
            sender: {
                [Op.or]: [user1, user2]
            }    
        },
        order: ['date']
    })
    .then(messages => {
        res.send(messages);
    })

})

module.exports = {
    getPrivateMessages
}