var app = require('../app.js');
var seq = require('../sequelize.js');
var dateFormat = require('dateformat');

const getMessages = ((req, res, next) => {

    seq.Message.findAll({
        include: {
            model: seq.User,
            attributes: ['login']
        }

    })
    .then(messages => {
        var result = []
        for(var i=0; i<messages.length; i++){
           var obj = new Object();
           obj.login = messages[i].user.login;
           obj.text = messages[i].text;
           obj.date = dateFormat(messages[i].date, 'yyyy-mm-dd HH:MM');
           result.push(obj);
        }
        res.send(result);
    });

});

const sendMessage = ((req, res, next) => {

    seq.Message.create({
        text: req.body.message,
        date: new Date(),
        userId: req.session.userId
    })
    .then(() => {
        res.redirect('/');
    })
})

module.exports = {
    getMessages,
    sendMessage
}