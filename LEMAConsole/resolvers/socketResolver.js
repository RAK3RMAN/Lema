/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

module.exports = function (server) {
    let io = require('socket.io').listen(server);
    let socketJWT = require("socketio-jwt");
    io.on('connection', socketJWT.authorize({
        //TODO Save Secret for each Node
        secret: '61862295-77ca-4088-967a-e3969d744db8',
        timeout: 15000
    }));
    io.on('authenticated', function (socket) {
        console.log('Connected Node with ID: ' + socket.decoded_token.node_id);
        socket.on('server custom event', function (data) {
            console.log(data);
        });
    });
};