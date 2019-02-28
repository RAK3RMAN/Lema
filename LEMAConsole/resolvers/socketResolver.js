/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//TODO Resolve socket.io connection issue
module.exports = function (app) {
    let http = require('http').Server(app);
    let io = require('socket.io')(http);
    let socketioJwt = require("socketio-jwt");
    io.sockets
        .on('connection', socketioJwt.authorize({
            secret: 'test',
            timeout: 15000
        })).on('authenticated', function(socket) {
        //this socket is authenticated, we are good to handle more events from it.
        console.log('hello! ' + socket.decoded_token.name);
    });
};