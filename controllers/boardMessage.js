var seq = require('../sequelize.js');
var dateFormat = require('dateformat');

const getBoardMessages = ((req, res, next) => {

    seq.BoardMessage.findAll({
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
           obj.message = messages[i].text;
           obj.date = dateFormat(messages[i].date, 'yyyy-mm-dd HH:MM');
           result.push(obj);
        }
        res.send(result);
    });

});

module.exports = {
    getBoardMessages
}