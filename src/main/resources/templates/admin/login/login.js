function validate(){

    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    
    if(username == "admin" && password == "123456")
    {
        alert("Login succesfully");
        return false;
    }
    else{
        alert("Login Failed");
    }
}