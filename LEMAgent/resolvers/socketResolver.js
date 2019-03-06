/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAgent/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let jwt = require('jwt-simple');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//Socket Functions
module.exports = function () {
    if (storage.get('setup_status') === "true") {
        //Broadcast
        console.log('Socket.io Connecting to LEMAConsole...');
        console.log('LEMAConsole IP: ' + storage.get('console_ip'));
        console.log(' ');
        //Setup JWT
        let payload = { node_id: storage.get('node_id') };
        let secret = storage.get('console_secret');
        let jwt_token = jwt.encode(payload, secret);
        //Setup Socket.io
        let io = require('socket.io-client');
        let socket = io.connect(storage.get('console_ip'));
        //Declare Socket.io Functions
        socket.on('connect', function () {
            socket
                .emit('authenticate', {token: jwt_token}) //send the jwt
                .on('authenticated', function () {
                    console.log('Authorized connection made to LEMAConsole');
                    //socket.emit('server custom event', {my: 'data'});
                })
                .on('unauthorized', function(msg) {
                    console.log("Unauthorized: " + JSON.stringify(msg.data));
                })
        });
    }
};