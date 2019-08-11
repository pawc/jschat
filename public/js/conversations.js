$(document).ready(() => {    

    $.ajax({
        url: '/getConversations',
        success: (users) => {

            $.each(users, (key, value) => {
                $('.container').append('<p><a href="#" id="'+value.id+'">'+value.login+'</a></p>');
            })

            var links = document.getElementsByTagName('a');
            $.each(links, (key, link) => {
                link.onclick = (() => {
                    location.replace('/messages/'+link.id);
                })
            });

        }
    })

})