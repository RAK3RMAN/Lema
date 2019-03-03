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
let morgan = require('morgan');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let ip = require('ip');
let bodyParser = require('body-parser');
let uuidv4 = require('uuid/v4');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//System Config Checks - - - - - - - - - - - - - - - - -
//Node ID Check
let node_id = storage.get('node_id');
if (node_id == undefined) {
    let newSecret = uuidv4();
    storage.set('node_id', newSecret);
    console.log('Lema Config Manager: Node ID Set - ' + newSecret);
}
//LEMAConsole Secret Check
let console_secret = storage.get('console_secret');
if (console_secret == undefined) {
    storage.set('console_secret', '');
    console.log('Lema Config Manager: LEMAConsole Secret Set to DEFAULT');
}
//Setup Status Check
let setup_status = storage.get('setup_status');
if (setup_status == undefined) {
    storage.set('setup_status', 'false');
    console.log('Lema Config Manager: Setup Status Set to DEFAULT - false');
}
//LEMAConsole IP Check
let console_ip= storage.get('console_ip');
if (console_ip == undefined) {
    storage.set('console_ip', '');
    console.log('Lema Config Manager: LEMAConsole IP Set to DEFAULT');
}
//End of System Config Checks - - - - - - - - - - - - - -

//Declare App
const app = express();
app.set('view engine', 'ejs');

//Resolvers
let socket = require('./resolvers/socketResolver.js');

//Other Processes Setup
app.use(cookieParser());
app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//End of Initialize Packages and Routers - - - - - - - -


//===================================================//
//       --- LEMAgent Config Routes/Logic  ---       //
//===================================================//

//Create Routes
app.post('/lema-agent/broadcast', agentBroadcast);
app.post('/lema-agent/setup', agentSetup);

//Broadcast Agent Information
function agentBroadcast(req, res) {
    res.json({ node_id: storage.get('node_id') });
}
//Receive Setup config from LEMAConsole
function agentSetup(req, res) {
    let agentConfig = req.body;
    console.log(agentConfig["console_ip"]);
    if ( agentConfig["console_ip"] === undefined || agentConfig["console_secret"] === undefined ) {
        console.log('ERROR: Not all parameters sent');
        res.json({ setupStat: 'failure', node_id: storage.get('node_id') });
    } else {
        storage.set('setup_status', 'true');
        storage.set('console_ip', agentConfig["console_ip"]);
        storage.set('console_secret', agentConfig["console_secret"]);
        res.json({ setupStat: 'success', node_id: storage.get('node_id'), node_arch: 'type' });
    }
}
//Remove LEMAConsole configuration, release, and await setup
function agentRelease(req, res) {
    let releaseCode = JSON.parse(req.body);
    console.log(releaseCode);
    storage.set('setup_status', 'false');
    storage.set('console_ip', '');
    storage.set('console_secret', '');
    res.json({ releaseStat: 'success', node_id: storage.get('node_id') });
}

//End of LEMAgent Config Routes/Logic - - - - - - - - -


//===================================================//
//              --- Error Handlers ---               //
//===================================================//

//404 - Send to Error Handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error Handler Logic
app.use(function (err, req, res, next) {
    //Determine Message
    console.log("ERROR: " + err.message);
    //Return Error
    res.status(err.status || 500);
});

//End of Error Handler - - - - - - - - - - - - - - - - -


//===================================================//
//        --- External Connections Setup ---         //
//===================================================//

//Port Listen
if (storage.get('setup_status') === "false") {
    let http = require('http');
    let client = http.createServer(app);
    client.listen(3030, function () {
        console.log(' ');
        console.log('===========================================');
        console.log(' LEMAgent ~ Startup | Created By: RAk3rman ');
        console.log('===========================================');
        console.log('Lema Agent Broadcasting at: ' + ip.address() + ":3030");
        console.log('Awaiting Setup Request from LEMAConsole...');
        console.log(' ');
    });
} else {
    console.log(' ');
    console.log('===========================================');
    console.log(' LEMAgent ~ Startup | Created By: RAk3rman ');
    console.log('===========================================');
}

//Initialize Socket.io
socket();

//End of External Connections Setup - - - - - - - - - -

module.exports = app;