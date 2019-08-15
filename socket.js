module.exports = function(server, session){

    var seq = require('./sequelize.js'); 
    var sharedSession = require('express-socket.io-session');
    var io = require('socket.io')(server);
    var dateFormat = require('dateformat');
    var usersConnected = [];

    io.use(sharedSession(session, {autoSave: true}));

    var userId;
    var login;

    io.on('connection', function(client){

        userId = client.handshake.session.userId;
        login = client.handshake.session.login;

        console.log(login + ' connected.');

    });

    const boardChat = io.of('/board');
    boardChat.on('connection', (client) => {

        client.on('join', function(data){

            console.log('Client '+login+' joined board.');

            var o = new Object();
            o.message = login+' joined the chat.';
            o.login = '-- system --';
            o.date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
            
            client.emit('user', o);
            client.broadcast.emit('user', o);
        });

        client.on('newMessage', (data) => {

            seq.BoardMessage.create({
                userId: userId,
                text: data.message,
                date: new Date()
            })

            data.date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
            client.emit('newMessage', data);
            client.broadcast.emit('newMessage', data);

        });

        client.on('disconnect', function(data){
        
            var o = new Object();
            o.message = login+' left the chat.';
            o.login = '-- system --';
            o.date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
            client.broadcast.emit('user', o);

        })

    })

    const privateChat = io.of('/private');
    privateChat.on('connection', (client) => {

        client.on('join', function(data){

            console.log(login + ' joined private.');

            var ob = new Object();
            ob.socketId = client.id;
            ob.userId = userId
            usersConnected.push(ob);
        });

        client.on('disconnect', function(data){
            
            for(var i=0, len=usersConnected.length; i<len; ++i){
                var c = usersConnected[i];

                if(c.socketId == client.id){
                    usersConnected.splice(i,1);
                    break;
                }
            }
        });

        client.on('newPrivateMessage', (data) => {

            seq.PrivateMessage.create({
                sender: data.sender,
                recipient: data.recipient,
                date: new Date(),
                text: data.text
            })
            data.date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');

            /*for(var i=0; i < usersConnected.length; i++){
                console.log(i + ': ' + usersConnected[i].userId + ', ' + usersConnected[i].socketId);
            }*/

            var senderSocketId = getSocketId(data.sender);
            var recipientSocketId = getSocketId(data.recipient);

            io.of('/private').to(senderSocketId).emit('newPrivateMessage', data);

            if(recipientSocketId){
                io.of('private').to(recipientSocketId).emit('newPrivateMessage', data);
            }
            
        })

    });

    function getSocketId(userId){
        for(var i=0, len=usersConnected.length; i<len; ++i){
            var c = usersConnected[i];
            if(c.userId == userId) return c.socketId;
        }      
    }

};