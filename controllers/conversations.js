var seq = require('../sequelize.js');
var sequelize = require('sequelize');

const conversationsGET = ((req, res, next) => {

    var users = [];

    seq.PrivateMessage.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('sender')), 'sender']],
        where: {
            recipient: req.session.userId
        }
    })
    .then(senders => {
        console.log("length: "+senders.length);
        for(var i=0; i<senders.length; i++){
            console.log('senders[i].sender: '+senders[i].sender);
            if(!users.includes(senders[i].sender)) users.push(senders[i].sender);
        }

        seq.PrivateMessage.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('recipient')), 'recipient']],
            where: {
                sender: req.session.userId
            }
        })
        .then(recipients => {
            for(var i=0; i<recipients.length; i++){
                if(!users.includes(recipients[i].recipient)) users.push(recipients[i].recipient);
            }

            res.send(users);
        })

    });

});

module.exports = {
    conversationsGET
}