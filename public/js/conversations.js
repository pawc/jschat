$(document).ready(() => {    

    $.ajax({
        url: '/getConversations',
        success: (users) => {

            $.each(users, (key, value) => {
                $('.conversations').append('<p><a href="/messages/'+value.id+'" id="'+value.id+'">'+value.login+'</a></p>');
            })

        }
    })

    var options = {
        url: 'getUsersLike?login=',
        getValue: 'login',
        list: {
            match: {
                enabled: true
            },
            onChooseEvent: function(){
                var interlocutorId = $('.searchInput').getSelectedItemData().id
                window.location.replace('/messages/'+interlocutorId);
            }
        }
    };

    $('.searchInput').easyAutocomplete(options);

})