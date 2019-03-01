/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//TODO Resolve socket.io connection issue
module.exports = function (server) {
    let io = require('socket.io');
    let socketioJwt = require("socketio-jwt");
    io.listen(server).sockets.on('connection', function (socket) {
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
    // io.sockets
    //     .on('connection', socketioJwt.authorize({
    //         secret: 'your secret or public key',
    //         timeout: 15000 // 15 seconds to send the authentication message
    //     })).on('authenticated', function(socket) {
    //     //this socket is authenticated, we are good to handle more events from it.
    //     console.log('hello! ' + socket.decoded_token.name);
    //     });
};