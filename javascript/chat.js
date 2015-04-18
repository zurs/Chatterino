$(document).ready(function(){
    connect();
})

function sendMessage(){
    var message = document.getElementById("message").value;
    
    var json = '{"function":"newMessage", "messageText":"' + message + '"}';
    var cFunc = function(){};
    sendToServer(json, cFunc);
}
