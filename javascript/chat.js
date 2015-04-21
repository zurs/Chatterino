$(document).ready(function(){
    connect();
})

function sendMessage(){
    var message = document.getElementById("message").value;
    alert("Skickar");
    var json = '{"function":"newMessage", "messageText":"' + message + '"}';
    var cFunc = function(){};
    sendToServer(json, cFunc);
}
