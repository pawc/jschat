$(document).ready(() => {

    if(myLogin == null) $("#content").attr("src", "/signup");

    $("#usersLink").click(function(event){
        event.preventDefault(); 
        $("#content").attr("src", "/users");
        setActive('users');
    });

    $("#profileLink").click(function(event){
        event.preventDefault(); 
        $("#content").attr("src", "/profile");
        setActive('profile');
    });

    $("#chatLink").click(function(event){
        event.preventDefault(); 
        $("#content").attr("src", "/chat");
        setActive('chat');
    });

});

function setActive(link){
    $("#profileNav").removeClass("active");
    $("#usersNav").removeClass("active");
    $("#chatNav").removeClass("active");

    if(link == 'users'){
        $('#usersNav').addClass("active");
    }

    if(link == 'profile'){
        $('#profileNav').addClass("active");
    }

    if(link == 'chat'){
        $('#chatNav').addClass("active");
    }

}