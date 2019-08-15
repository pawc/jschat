$(document).ready(() => {    

    $.ajax({
        url: '/getConversations',
        success: (users) => {

            $.each(users, (key, value) => {
                $('.conversations').append('<p><a href="/messages/'+value.id+'" id="'+value.id+'">'+value.login+'</a></p>');
            })

        }
    })

    $.ajax({
        url: '/getUsersLike',
        data: {
            login: ''
        },
        success: (logins) => {
            var data = [];

            $.each(logins, (i, o) => {
                data.push(o.login);
            });

            var options = {
                data,
                list: {
                    onChooseEvent: function(){
                        alert($('.searchInput').getSelectedItemData());
                    }
                }
            };
    
            $('.searchInput').easyAutocomplete(options);

        }
    })

})