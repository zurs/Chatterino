$(document).ready(function(){
    connect();
    $("#send").click(function(){
        alert("sent");
        sendMessage();
        document.getElementById("message").value = "";
    });
})

function sendMessage(){
    var message = document.getElementById("message").value;
    alert("Skickar");
    var json = '{"function":"newMessage", "messageText":"' + message + '"}';
    var cFunc = function(){};
    sendToServer(json, cFunc);
}
