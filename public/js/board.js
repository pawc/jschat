$(document).ready(() => {

    $.ajax({
        url: '/getMessages',
        success : (result) => {
            $.each(result, (index, obj) => {
                $('#messageBoard').append('<tr>'+
                    '<td>'+obj.date+'</td>'+
                    '<td>'+obj.login+'</td>'+
                    '<td>'+obj.text+'</td>'+
                '</td>');
            })
        }
    })

});