var lastMessage = "0";
var oldArray = new Array();

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
        data = JSON.parse(data);
        var chatwindow = document.getElementById("conversationwrapper");
        for(var i = 0; i < data.length; i++){
            chatwindow.innerHTML += "<p><span class='messagenick'>" + data[i].senderNick + "</span>: " + data[i].messageText + "</p><br/>";
            oldArray.push(data[i].messageID);
            //lastMessage = data[i].messageID;
        }
        
        setInterval(getNewMessages, 250);
    };
    sendToServer(json, cFunc);
}

function getNewMessages(){ // Körs varje 250 millisekund när man anslutit till servern
    var json = '{"function":"checkForNewMessages"}';
    var cFunc = function(data){
        if(!(data == "false")){
            data = JSON.parse(data);
            /* var chatwindow = document.getElementById("conversationwrapper");
            for(var i = 0; i < data.length; i++){
                chatwindow.innerHTML += "<p><span class='messagenick'>" + data[i].senderNick + "</span>: " + data[i].messageText + "</p><br/>";
                lastMessage = data[i].messageID;
            } */
            
            addNewMessages(data, oldArray);
            
        }
    };
    sendToServer(json, cFunc);
}

//clientSide-kontroll för nya meddelanden

function addNewMessages(newArray, oldArray){
    var chatwindow = document.getElementById("conversationwrapper");
    
    for(var i = 0; i < oldArray.length; i++) {
        var messageFound = false;
        for(var j = 0; j < newArray.length; j++) {
            if(oldArray[i].messageID == newArray[j].messageID){
                messageFound = true; 
            }
        }
        if(!messageFound) { //meddelandet hittades inte i gamla arrayen och måste därför vara ett nytt --> lägg till
                chatwindow.innerHTML += "<p><span class'messagenick'>" + newArray[j].senderNick + "</span>: " + newArray[j].messageText + "</p><br/>";
        }
    }
    
    oldArray = newArray; //sätter nya arrayen till gamla
}






















//kdkd