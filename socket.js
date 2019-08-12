module.exports = function(server, session){

    var seq = require('./sequelize.js'); 
    var sharedSession = require('express-socket.io-session');
    var io = require('socket.io')(server);
    var dateFormat = require('dateformat');
    var usersInChat = new Set([]);

    io.use(sharedSession(session, {autoSave: true}));

    io.on('connection', function(client){
        
        client.on('join', function(data){
            console.log('Client '+client.handshake.session.login+' logged in.');
            usersInChat.add(client.handshake.session.login);
            console.log('Users chatting: '+Array.from(usersInChat).join(' '));
            var o = new Object();
            o.message = client.handshake.session.login+' joined the chat.';
            o.users = Array.from(usersInChat).join(',');
            client.emit('user', o);
            client.broadcast.emit('user', o);
        });

        client.on('disconnect', function(data){
            console.log('Client '+client.handshake.session.login+' left.');
            usersInChat.delete(client.handshake.session.login);
            console.log('Users chatting: '+Array.from(usersInChat).join(' '));
            var o = new Object();
            o.message = client.handshake.session.login+' left the chat.';
            o.users = Array.from(usersInChat).join(',');
            client.broadcast.emit('user', o);
        })

        client.on('newMessage', (data) => {
            console.log('message from userId: '+client.handshake.session.userId);
            seq.BoardMessage.create({
                userId: client.handshake.session.userId,
                text: data.message,
                date: new Date()
            })
            data.date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
            client.emit('newMessage', data);
            client.broadcast.emit('newMessage', data);
        });

        client.on('newPrivateMessage', (data) => {
            console.log('private message from user: '+data.sender+' to '+data.recipient+' : '+data.message);
            seq.PrivateMessage.create({
                sender: data.sender,
                recipient: data.recipient,
                date: new Date(),
                text: data.message
            })
            data.date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
            client.emit('newPrivateMessage', data);
            client.broadcast.emit('newPrivateMessage', data);
        })

    });

};