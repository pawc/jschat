var seq = require('../sequelize.js');
const Op = require('sequelize').Op;

const getMessages = ((req, res, next) => {

    var user1 = req.session.userId;
    var user2 = req.params.userId;

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
    getMessages
}