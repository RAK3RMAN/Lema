/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAgent/app.js
Description  : Initializes nodejs, websocket
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//===================================================//
//     --- Initialize Packages and Routers ---       //
//===================================================//

//Declare Packages
let express = require('express');
const app = express();
let ip = require('ip');
let http = require('http');
let client = http.createServer(app);
client.listen(3030, function () {
    console.log(' ');
    console.log('===========================================');
    console.log(' LEMAgent ~ Startup | Created By: RAk3rman ');
    console.log('===========================================');
    console.log('Lema Agent Broadcasting at: ' + ip.address() + ":3030");
    console.log(' ');
});
let io = require('socket.io-client')(client);

//End of Initialize Packages and Routers - - - - - - - -
//TODO Resolve socket.io connection issue
let socket = io.connect('http://127.0.0.1:3000');
function emitMessage(){
    socket.emit('my other event', { my: 'data' });
    setTimeout(function(){emitMessage(socket)}, 1000);
}
emitMessage();
// socket.on('connect', function () {
//     socket
//         .emit('authenticate', {token: jwt}) //send the jwt
//         .on('authenticated', function () {
//             //do other things
//         })
//         .on('unauthorized', function(msg) {
//             console.log("unauthorized: " + JSON.stringify(msg.data));
//             throw new Error(msg.data.type);
//         })
// });

module.exports = app;