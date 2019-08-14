var seq = require('../sequelize.js');
const Op = require('sequelize').Op;
var dateFormat = require('dateformat');
var createError = require('http-errors');

const getMessages = ((req, res, next) => {

    var user1 = req.session.userId;
    var userLogin = req.session.login;
    var user2 = req.params.userId;

    seq.User.findOne({
        attributes: ['login'],
        where: {
            id: user2
        }
    })
    .then((user) => {
        if(user.login){
            res.render('messages', {
                userId: user1,
                interlocutor: user2,
                userLogin: userLogin,
                interlocutorLogin: user.login
            });
        }
        else{
            next(createError(404));
        }
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
        include: [{
                model: seq.User,
                attributes: ['login'],
                as: 'senderId'
            },
            {
                model: seq.User,
                attributes: ['login'],
                as: 'recipientId'
            }
        ],
        order: ['date']
    })
    .then(messages => {

        var result = [];

        for(var i=0; i<messages.length; i++){
            var obj = new Object();
            obj.sender = messages[i].sender;
            obj.senderLogin = messages[i].senderId.login;
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