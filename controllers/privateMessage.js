var seq = require('../sequelize.js');
const Op = require('sequelize').Op;
var dateFormat = require('dateformat');

const getMessages = ((req, res, next) => {

    var user1 = req.session.userId;
    var user2 = req.params.userId;

    res.render('messages', {
        userId: user1,
        interlocutor: user2
    });

});

const getAllMessages = ((req, res, next) => {

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

        var result = [];

        for(var i=0; i<messages.length; i++){
            var obj = new Object();
            obj.sender = messages[i].sender;
            obj.recipient = messages[i].recipient;
            obj.date = dateFormat(messages[i].date, 'yyyy-mm-dd HH:MM');
            obj.text = messages[i].text;
            result.push(obj);
        }
        res.send(result);
    })

})

module.exports = {
    getMessages,
    getAllMessages
}