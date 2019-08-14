module.exports = function(server, session){

    var seq = require('./sequelize.js'); 
    var sharedSession = require('express-socket.io-session');
    var io = require('socket.io')(server);
    var dateFormat = require('dateformat');
    var usersInChat = new Set([]);
    var usersConnected = [];

    io.use(sharedSession(session, {autoSave: true}));

    io.on('connection', function(client){
        
        client.on('join', function(data){
            console.log('Client '+client.handshake.session.login+' logged in.');
            usersInChat.add(client.handshake.session.login);
            var ob = new Object();
            ob.socketId = client.id;
            ob.userId = client.handshake.session.userId;
            usersConnected.push(ob);
            console.log('Users chatting: '+Array.from(usersInChat).join(' '));
            var o = new Object();
            o.message = client.handshake.session.login+' joined the chat.';
            o.login = '-- system --';
            o.date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
            o.users = Array.from(usersInChat).join(',');
            client.emit('user', o);
            client.broadcast.emit('user', o);
        });

        client.on('disconnect', function(data){
            console.log('Client '+client.handshake.session.login+' left.');

            for(var i=0, len=usersConnected.length; i<len; ++i){
                var c = usersConnected[i];

                if(c.socketId == client.id){
                    usersConnected.splice(i,1);
                    break;
                }
            }

            usersInChat.delete(client.handshake.session.login);
            console.log('Users chatting: '+Array.from(usersInChat).join(' '));
            var o = new Object();
            o.message = client.handshake.session.login+' left the chat.';
            o.users = Array.from(usersInChat).join(',');
            client.broadcast.emit('user', o);
        })

        client.on('newMessage', (data) => {
            console.log('message from userId: '+client.handshake.session.userId);
            console.log('users connected: ');
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

            for(var i=0; i < usersConnected.length; i++){
                console.log(i + ': ' + usersConnected[i].userId + ', ' + usersConnected[i].socketId);
            }

            var senderSocketId = getSocketId(data.sender);
            var recipientSocketId = getSocketId(data.recipient);

            io.to(senderSocketId).emit('newPrivateMessage', data);

            if(recipientSocketId){
                io.to(recipientSocketId).emit('newPrivateMessage', data);
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