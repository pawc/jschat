$(document).ready(() => {
    getUsers();
});

function getUsers(){

    $.ajax({
        url: '/getAllUsers',
        success : (result) => {
            $.each(result, (index, obj) => {
                $('#usersTable').append('<tr>'
                +'<td>'+isNull(obj.userDatum.user.login)+'</td>'
                +'<td>'+isNull(obj.userDatum.name)+'</td>'
                +'<td>'+isNull(obj.userDatum.city)+'</td>'
                +'<td>'+isNull(obj.lastSignIn.toLocaleString())+'</td>'
                +'</tr>');
            })
        }
    })

}

function addMessage(data){

    $('#messageBoard').append('<div class="row">('+data.date+
        ') &nbsp;<b>'+data.login+': </b>&nbsp;'+data.message+
    '</div>');

}

function isNull(obj) {
    return (obj == null) ? "" : obj
}