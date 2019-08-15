$(document).ready(() => {

    getMessages();

    var socket = io('/board').connect('http://localhost:3000/');

    socket.on('connect', function(data){
    	socket.emit('join');
    });

    socket.on('newMessage', addMessage);

    socket.on('user', addMessage);

    $('#btn-input').keypress(function(event){
        if(event.which == 13){
            var message = $('#btn-input').val();
            $('#btn-input').val('');
            socket.emit('newMessage', {
                login: myLogin,
                message: message
            });
        }
    });

});

function getMessages(){

    $.ajax({
        url: '/getBoardMessages',
        success : (result) => {
            $.each(result, (index, obj) => {
                addMessage(obj);
            })
        }
    })

}

function addMessage(data){

    var appendDiv = '<div class="row msg_container base_sent">\
       <div class="col-md-12">\
            <div class="messages msg_sent">\
                <p>'+data.message+'</p>\
                <time>'+data.date+': '+data.login+'</time>\
            </div>\
        </div>\
    </div>';

    $(".msg_container_base").append(appendDiv);

    //scroll down
    $(".msg_container_base").scrollTop($(".msg_container_base")[0].scrollHeight);

}
