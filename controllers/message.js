var seq = require('../sequelize.js');

const getMessages = ((req, res, next) => {

    seq.Message.findAll()
    .then(messages => {
        res.send(messages);
    });

});

module.exports = {
    getMessages
}