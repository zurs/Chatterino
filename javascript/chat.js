$(document).ready(function(){
    connect();
    $("#send").click(function(){
        sendMessage();
        document.getElementById("message").value = "";
    });
})

function sendMessage(){
    var message = document.getElementById("message").value;
    var json = '{"function":"newMessage", "messageText":"' + message + '"}';
    var cFunc = function(){
        alert("Skickat");
    };
    alert("Skickar");
    sendToServer(json, cFunc);
}
