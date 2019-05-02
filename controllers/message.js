var seq = require('../sequelize.js');

const getMessages = ((req, res, next) => {

    seq.Message.findAll({
        include: {
            model: seq.User,
            attributes: ['login']
        }

    })
    .then(messages => {
        res.send(messages);
    });

});

module.exports = {
    getMessages
}