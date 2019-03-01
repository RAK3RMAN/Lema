/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

module.exports = function (server) {
    let io = require('socket.io').listen(server);
    io.on('connection', function (socket) {
        console.log('Connection Made');
        socket.on('server custom event', function (data) {
            console.log(data);
        });
    });
};