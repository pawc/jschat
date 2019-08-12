$(document).ready(() => {    

    $.ajax({
        url: '/getConversations',
        success: (users) => {

            $.each(users, (key, value) => {
                $('.container').append('<p><a href="/messages/'+value.id+'" id="'+value.id+'">'+value.login+'</a></p>');
            })

        }
    })

})