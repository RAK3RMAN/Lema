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
                .emit('authenticate', {token: jwt_token})
                .on('authenticated', function () {
                    console.log('LEMAgent: Authorized connection made to LEMAConsole');
                    socket
                        //Agent Actions
                        .on('release', function (data) {
                            console.log('LEMAgent: Starting to Release Node...');
                            agentRelease(data);
                        })
                })
                .on('unauthorized', function(msg) {
                    console.log("Unauthorized: " + JSON.stringify(msg.data));
                })
        });
    }
};

//Remove LEMAConsole configuration, release, and await setup
function agentRelease(authID) {
    if (authID === storage.get('node_id')) {
        storage.set('setup_status', 'false');
        storage.set('console_ip', '');
        storage.set('console_secret', '');
        console.log('LEMAgent: Node Release Successful');
    } else {
        console.log('LEMAgent: Node Release Failed');
    }
}