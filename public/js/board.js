$(document).ready(() => {

    getMessages();

    var socket = io.connect('http://localhost:3000');
    
    socket.on('connect', function(data){
    	socket.emit('join');
    });

    socket.on('newMessage', addMessage);

    socket.on('user', userJoinedLeft);

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
       <div class="col-md-10 col-xs-10">\
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

function userJoinedLeft(data){
    $('#messageBoard').append('<div class="row"><i>'+data.message+'</i></div>');
    updateUsersList(data.users);
}

function updateUsersList(data){
    var tab = data.split(',');
    $('#usersList').empty();

    for(var i=0; i < tab.length; i++){
        $('#usersList').append('<li class="list-group-item">'+tab[i]+'</li>')
    }
}