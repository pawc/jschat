$(document).ready(() => {

    $('#boardLink').click(() => {
        
        $.ajax({
            url: '/getMessages',
            success : (result) => {
                $.each(result, (index, obj) => {
                    var date = new Date(obj.date);
                    var year = date.getFullYear();
                    var month = date.getMonth();
                    var day = date.getDate();
                    var dateFormatted = year+'-'+month+'-'+day;
                    $('#messageBoard').append('<tr>'+
                        '<td>'+dateFormatted+'</td>'+
                        '<td>'+obj.user.login+'</td>'+
                        '<td>'+obj.text+'</td>'+
                    '</td>');
                })
            }
        })
    
    });

});