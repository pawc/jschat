$(document).ready(() => {

    getMessages();

    var socket = io.connect('http://localhost:3000');
    
    socket.on('connect', function(data){
    	socket.emit('join');
    });

    socket.on('newMessage', addMessage);

    socket.on('user', userJoinedLeft);

    $('#messageForm').submit(function(e){
        e.preventDefault();
        var message = $('#message').val();
        socket.emit('newMessage', {
            login: myLogin,
            message: message
        });
        $('#message').val('');
    });

});

function getMessages(){

    $.ajax({
        url: '/getMessages',
        success : (result) => {
            $.each(result, (index, obj) => {
                $('#messageBoard').append('<div class="row">('+
                    obj.date+') &nbsp;<b>'+obj.login+': </b>&nbsp;'+obj.text+
                '</div>');
            })
        }
    })

}

function addMessage(data){

    $('#messageBoard').append('<div class="row">('+data.date+
        ') &nbsp;<b>'+data.login+': </b>&nbsp;'+data.message+
    '</div>');

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