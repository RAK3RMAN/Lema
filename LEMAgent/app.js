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
let ip = require('ip');
const app = express();
let http = require('http').Server(app);
let io = require('socket.io-client')(http);
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//End of Initialize Packages and Routers - - - - - - - -
//TODO Resolve socket.io connection issue
let socket = io.connect('http://127.0.0.1:3000', {reconnect: true});
socket.on('connect', function () {
    socket
        .emit('authenticate', {token: 'test'}) //send the jwt
        .on('authenticated', function () {
            //do other things
        })
        .on('unauthorized', function(msg) {
            console.log("unauthorized: " + JSON.stringify(msg.data));
            throw new Error(msg.data.type);
        })
});

module.exports = app;