$(document).ready(function(){
    connect();
    $("#send").click(function(){
        sendMessage();
        document.getElementById("message").value = "";
    });
    
    $('#back').click(function() {
       window.location.href = "index.html";
    });
})

function sendMessage(){
    var message = document.getElementById("message").value;
    var json = '{"function":"newMessage", "messageText":"' + message + '"}';
    var cFunc = function(){
        alert("Skickat");
    };
    sendToServer(json, cFunc);
}

//backBtn
$('#back').height($('#back').width() * 5);
