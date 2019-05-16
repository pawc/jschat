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
    $('#messageBoard').append('<div class="row"><i>'+data+'</i></div>');
}