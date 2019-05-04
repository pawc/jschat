function validateChangePassword(){
    if($('#newPassword').val() != $('#newPasswordRepeat').val()){
        alert("passwords don't match");		
        return false;
    }
    else{
        return true;
    }

}
