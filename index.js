var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');
// list of users
var CLIENTS=[];
var id;

// web server is using 8081 port
var webSocketServer = new WebSocketServer.Server({ port: 8081 });

// check if connection is established
webSocketServer.on('connection', function(ws) {

    id = Math.random();
    console.log('connection is established : ' + id);
    CLIENTS[id] = ws;
    CLIENTS.push(ws);

    ws.on('message', function(message) {
        console.log('received: %s', message);
        sendAll(Buffer.from(message).toString())
        // var received = JSON.parse(message);

        // if(received.type == "login"){
        //     ws.send(message);  // send message to itself

        //     sendNotes(JSON.stringify({
        //         user: received.name,
        //         type: "notes"
        //     }), ws, id);

        // }else if(received.type == "message"){
        //     sendAll(message); // broadcast messages to everyone including sender
        // }
    });

    ws.on('close', function() {
        console.log('user ' + id + ' left chat');
        delete CLIENTS[id];
    });

});

function sendNotes(message, ws, id) {
    console.log('sendNotes : ', id);
    if (CLIENTS[id] !== ws) {
        console.log('IF : ', message);
        for (var i = 0; i < CLIENTS.length; i++) {
            CLIENTS[i].send(message);
        }
    }else{
        console.log('ELSE : ', message);
    }
}
function sendAll(message) {
    console.log('sendAll : ');
    for (var j=0; j < CLIENTS.length; j++) {
        // Отправить сообщения всем, включая отправителя
        console.log('FOR : ', message);
        CLIENTS[j].send(message);
    }
}

function customFilter(ws){
    if(ws.hasOwnProperty('id')){

        for(var i=0; i<ws.keys(id).length; i++){
            console.log(id);
        }
    }
}

console.log("Server is running on 8080 and 8081 ports");