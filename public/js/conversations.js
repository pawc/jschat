$(document).ready(() => {    

    $.ajax({
        url: '/getConversations',
        success: (users) => {

            $.each(users, (key, value) => {
                $('.container').append('<p>'+value.name+'</p>');
            })

        }
    })

})