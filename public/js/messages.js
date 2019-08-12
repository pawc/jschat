$(document).ready(() => {    

    getMessages();

    var socket = io.connect('http://localhost:3000');

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
    if((data.sender == userId || data.recipient == userId) 
        && (data.sender == interlocutor || data.recipient == interlocutor)){
        // append to messages div
    }
}