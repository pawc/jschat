$(document).ready(() => {
    getUsers();
});

function getUsers(){

    $.ajax({
        url: '/getAllUsers',
        success : (result) => {
            $.each(result, (index, obj) => {
                $('#usersTable').append('<tr>'
                +'<td><a href="users/'+obj.user.login+'">'+isNull(obj.user.login)+'</a></td>'
                +'<td>'+isNull(obj.user.userDatum.name)+'</td>'
                +'<td>'+isNull(obj.user.userDatum.city)+'</td>'
                +'<td>'+isNull(obj.lastSignIn.toLocaleString())+'</td>'
                +'</tr>');
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
                var interlocutorLogin = $('.searchInput').getSelectedItemData().login;
                window.location.replace('/users/'+interlocutorLogin);
            }
        }
    };

    $('.searchInput').easyAutocomplete(options);

}

function addMessage(data){

    $('#messageBoard').append('<div class="row">('+data.date+
        ') &nbsp;<b>'+data.login+': </b>&nbsp;'+data.message+
    '</div>');

}

function isNull(obj) {
    return (obj == null) ? "" : obj
}