var cryptedPass = true;

$(document).ready(function(){
    
    initialize();
    
    $("#password").on("change", function(){
        cryptedPass = false;
    });
    $("#save").click(function(){
        saveSettings();
        alert("Sparat");
        window.location.href = "index.html";
    });
});

function initialize(){
    document.getElementById("adress").value = window.localStorage.getItem("adress");
    document.getElementById("nickname").value = window.localStorage.getItem("nickname");
    document.getElementById("password").value = window.localStorage.getItem("password");
}

function saveSettings(){
    var adress = document.getElementById("adress").value;
    var nickname = document.getElementById("nickname").value;
    var password = document.getElementById("password").value;
    if(!cryptedPass){
        password = CryptoJS.SHA1(password); //Kryptera till SHA1
        alert(password);
    }
    
    window.localStorage.setItem("adress", adress);
    window.localStorage.setItem("nickname", nickname);
    window.localStorage.setItem("password", password);
}

function createSettings(){
    
    var adress = document.getElementById("adress").value;
    window.localStorage.setItem("adress", adress); // Sätter adressen som ska användas
    var nickname = document.getElementById("nickname").value;
    var password = document.getElementById("password").value;
    password = CryptoJS.SHA1(password); //Kryptera till SHA1
    
    // Skapa json och skicka till servern
    var json = '{"function":"createUser"}';
    var cFunc = function(data){
        if(data == "true"){
            
            alert("Your nickname is now registered, just connect and chat!");
            window.location.href = "index.html";
        }
        else if(data == "false"){
            alert("Nickname was already taken...");
        }
        else{
            alert("Something went wrong with the server");
        }
    }
    sendToServer(json, cFunc);
    
}