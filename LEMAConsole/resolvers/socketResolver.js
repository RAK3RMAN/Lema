/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let node = require('../models/nodeModel.js');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');

//Socket Functions
module.exports = function (server) {
    let io = require('socket.io').listen(server);
    let socketJWT = require("socketio-jwt");
    io.sockets
        .on('connection', socketJWT.authorize({
            secret: storage.get('public_secret'),
            timeout: 15000
        }))
        .on('authenticated', function (socket) {
            let nodeID = socket.decoded_token.node_id;
            console.log('Node CONNECTED with ID: ' + nodeID);
            updateStatus(nodeID, "online")
            .on('disconnect', function (reason) {
                console.log('Node DISCONNECTED with ID: ' + nodeID + ' | Reason: ' + reason);
                updateStatus(nodeID, "offline");
            })
        })
};

//Update Status of Node Device when Connected
function updateStatus(node_id, status) {
    node.findOneAndUpdate({ node_id: node_id }, { $set: { node_status: status }}, function (err, data) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
        }
        if (debug_mode === "true") { console.log("NODE Resolver: Node Status Updated: " + data) }
    });
}