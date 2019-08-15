$(document).ready(() => {    

    getMessages();

    var socket = io('/private').connect('http://localhost:3000');

    socket.on('connect', function(data){
    	socket.emit('join');
    });

    $('#btn-input').keypress(function(event){
        if(event.which == 13){
            var message = $('#btn-input').val();
            $('#btn-input').val('');
            socket.emit('newPrivateMessage', {
                sender: userId,
                recipient: interlocutor,
                senderLogin: userLogin,
                text: message
            })
        }
    });

    socket.on('newPrivateMessage', addPrivateMessage);

});

function getMessages(){
    $.ajax({
        url: '/messages/get/' + interlocutor,
        success: (privateMessages) => {

            $.each(privateMessages, (key, privateMessage) => {
                addPrivateMessage(privateMessage);
            })
        }
    })
}

function addPrivateMessage(data){
    if(interlocutor == data.sender || interlocutor == data.recipient){
        var appendDiv = '<div class="row msg_container base_sent">\
            <div class="col-md-12">\
                <div class="messages msg_sent">\
                    <p>'+data.text+'</p>\
                    <time>'+data.date+': '+data.senderLogin+'</time>\
                </div>\
            </div>\
        </div>';
    
        $(".msg_container_base").append(appendDiv);
    
        //scroll down
        $(".msg_container_base").scrollTop($(".msg_container_base")[0].scrollHeight);
    
    }
}