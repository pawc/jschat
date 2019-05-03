$(document).ready(() => {

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

});