function sendToServer(json, cFunc){ // cFunk står för customFunction som händer när svaret kommer tillbaka
    var username = window.localStorage.getItem("username");
    var password = window.localStorage.getItem("password");

    var addjson = '{"nickname":"' + nickname + '", "password":"' + password + '",'; // Det som ska läggas till i json
    var fulljson = addjson.concat(json.slice(1)); // Lägger ihop strängarna
    //Skicka kommandot till servern
    $.post(window.localStorage.getItem("url"), fulljson, cFunc, "text");
}