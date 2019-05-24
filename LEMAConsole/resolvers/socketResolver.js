/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let node = require('../models/nodeModel.js');
let request = require('request');
let requests = require('../models/requestsModel.js');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');

//Socket Functions
module.exports.initialize = function (server) {
    let io = require('socket.io').listen(server);
    let socketJWT = require("socketio-jwt");
    io.sockets
        .on('connection', socketJWT.authorize({
            secret: storage.get('public_secret'),
            timeout: 15000
        }))
        .on('authenticated', function (socket) {
            let nodeID = socket.decoded_token.node_id;
            console.log('Node CONNECTED with ID: ' + nodeID + ' | SocketID: ' + socket.id);
            updateStatus(nodeID, "online", socket.id);
            socket.on('pinConfig', function (data) {
                node.findOneAndUpdate({ node_id: nodeID }, { $set: { pin_config: data } }, function (err, updatedNode) {
                    if (err) {
                        console.log("NODE Resolver: Update failed: " + err);
                    }
                });
            });
            socket.on('disconnect', function (reason) {
                console.log('Node DISCONNECTED with ID: ' + nodeID + ' | Reason: ' + reason);
                updateStatus(nodeID, "offline", socket.id);
            })
        });
    exportIO(io);
};

//Export IO functions to other JS files
function exportIO(io) {
    module.exports.exportIO = io;
}

//Update Status of Node Device when Connected
function updateStatus(node_id, status, socketID) {
    //Save Node Parameter to Node DB
    node.findOneAndUpdate({ node_id: node_id }, { $set: { node_status: status, socket_id: socketID }}, function (err, data) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
        }
        //if (debug_mode === "true") { console.log("NODE Resolver: Node Status Updated: " + data) }
    });
    //Log Request
    let classType = "";
    if (status === "online") {
        classType = 'connection';
    }
    if (status === "offline") {
        classType = 'disconnection';
    }
    let newRequest = new requests({
        class: classType,
        node_associated: node_id,
        details: 'test'
    });
    newRequest.save(function (err, created_request) {
        if (err) {
            console.log("REQUEST Resolver: Save failed: " + err);
        } else {
            if (debug_mode === "true") { console.log('REQUEST Resolver: Request Created: ' + JSON.stringify(created_request)) }
        }
    });
}