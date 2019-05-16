$(document).ready(() => {

    $("#usersLink").click(function(event){
        event.preventDefault(); 
        $("#content").attr("src", "/users");
    });

    $("#profileLink").click(function(event){
        event.preventDefault(); 
        $("#content").attr("src", "/profile");
    });

    $("#chatLink").click(function(event){
        event.preventDefault(); 
        $("#content").attr("src", "/chat");
    });

});