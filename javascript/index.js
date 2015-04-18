$(document).ready(function(){
    $("#enter").click(function(){
        window.location.href = "chat.html";
    });
    
    $("#settings").click(function(){
        window.location.href = "settings.html";
    });
    
    $("#exit").click(function(){
        document.getElementById("alerts").innerHTML = '<div class="alert alert-danger" role="alert">Du kan inte avsluta ännu</div>';
    });
    
});