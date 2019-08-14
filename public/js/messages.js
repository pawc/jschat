$(document).ready(() => {    

    getMessages();

    var socket = io.connect('http://localhost:3000');

    socket.on('connect', function(data){
    	socket.emit('join');
    });

    $('#messageForm').submit(function(e){
        e.preventDefault();
        var message = $('#message').val();
        socket.emit('newPrivateMessage', {
            sender: userId,
            recipient: interlocutor,
            message: message
        })
        $('#message').val('');
    });

    socket.on('newPrivateMessage', addPrivateMessage);

});

function getMessages(){
    $.ajax({
        url: '/messages/get/' + interlocutor,
        success: (privateMessages) => {

            $.each(privateMessages, (key, privateMessage) => {
                $("#messages").append('<p><b>'
                    +privateMessage.date + ' '
                    +privateMessage.senderLogin + ': </b>'
                    +privateMessage.text+'</p>');
            })
        }
    })
}

function addPrivateMessage(data){
    if(interlocutor == data.sender || interlocutor == data.recipient) console.log(data.message);
}