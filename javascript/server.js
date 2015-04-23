function sendToServer(json, cFunc){ // cFunk står för customFunction som händer när svaret kommer tillbaka
    var nickname = window.localStorage.getItem("nickname");
    var password = window.localStorage.getItem("password");

    var addjson = '{"nickname":"' + nickname + '", "password":"' + password + '",'; // Det som ska läggas till i json
    var fulljson = addjson.concat(json.slice(1)); // Lägger ihop strängarna
    //Skicka kommandot till servern
    $.post(window.localStorage.getItem("url"), fulljson, cFunc, "text");
}

function connect(){
    var json = '{"function":"connection"}';
    var cFunc = function(data){
        if(data == "true"){
            alert("Connected");
            setInterval(getNewMessages, 250);
        }
        else{
            alert("Couldn't connect");
            window.location.href = "index.html";
        }
    };
    sendToServer(json, cFunc);
}

function getNewMessages(){
    var json = '{"function":"checkForNewMessages"}';
    var cFunc = function(data){
        if(!(data == "false")){
            data = JSON.parse(data);
            var chatwindow = document.getElementById("conversationwrapper");
            for(var i = 0; i < data.length; i++){
                chatwindow.innerHTML += "<p><span class='messagenick'>" + data[i].senderNick + "</span>" + data[i].messageText + "</p><br />";
            }
            
        }
    };
    sendToServer(json, cFunc);
}