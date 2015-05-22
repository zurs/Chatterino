window.localStorage.setItem("lastMessage", 0);

function sendToServer(json, cFunc){ // cFunk står för customFunction som händer när svaret kommer tillbaka
    var nickname = window.localStorage.getItem("nickname");
    var password = window.localStorage.getItem("password");

    var addjson = '{"nickname":"' + nickname + '", "password":"' + password + '",'; // Det som ska läggas till i json
    var fulljson = addjson.concat(json.slice(1)); // Lägger ihop strängarna
    //Skicka kommandot till servern
    $.post(window.localStorage.getItem("url"), fulljson, cFunc, "text");
}

function connect(){
    var json = '{"func":"connection"}';
    var cFunc = function(data){
        data = JSON.parse(data);
        if(data != true){
            alert("Det gick inte att ansluta till servern");
            window.location.href = "index.html";
        }
        setInterval(function(){getNewMessages();}, 250); // Kollar efter meddelanden 4 ggr per sekund
    };
    sendToServer(json, cFunc);
}

function getNewMessages(){ // Körs varje 250 millisekund när man anslutit till servern
    var json = '{"func":"checkForNewMessages"}';
    var cFunc = function(data){
        if(!(data == "false")){
            data = JSON.parse(data);
            addNewMessages(data.reverse()); // Hampes funktion för att lägga till meddelanden
            
        }
    };
    sendToServer(json, cFunc);
    var conversationwrapper = document.getElementById("conversationwrapper");
    conversationwrapper.scrollTop = conversationwrapper.scrollHeight;
}

//clientSide-kontroll för nya meddelanden
function addNewMessages(data){
    var lastMessage = window.localStorage.getItem("lastMessage");
    var chatwindow = document.getElementById("conversationwrapper");
    for(i = 0; i < data.length; i++){
        if(lastMessage < data[i].messageID){
            chatwindow.innerHTML += "<p><span class='messagenick'>" + data[i].senderNick + "</span>: " + data[i].messageText + "</p>";
            lastMessage = data[i].messageID;
        }
    }
    window.localStorage.setItem("lastMessage", lastMessage);
}