/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAgent/app.js
Description  : Initializes nodejs, websocket
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//===================================================//
//     --- Initialize Packages and Routers ---       //
//===================================================//

//Declare Packages
let os = require('os');
let express = require('express');
let morgan = require('morgan');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let ip = require('ip');
let bodyParser = require('body-parser');
let uuidv4 = require('uuid/v4');
let fs = require('fs');
let cmd = require('node-cmd');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let pinConfig = new dataStore({path: './config/pinConfig.json'});

//Resolvers
let socket = require('./resolvers/socketResolver.js');
let pinAction = require('./resolvers/pinactionResolver.js');

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
//System Architecture Check
let sys_arch = storage.get('sys_arch');
if (sys_arch == undefined) {
    //Find Sys Arch
    let node_type = "unknown";
    if (os.type() === "Linux") {
        if ((fs.readFileSync('/etc/os-release', 'utf8')).search('raspbian')) {
            node_type = "raspberryPi";
        } else {
            node_type = "linux";
        }
    } else if (os.type() === "Darwin") {
        node_type = "darwin";
    } else if (os.type() === "Windows") {
        node_type = "windows";
    }
    storage.set('sys_arch', node_type);
    console.log('Lema Config Manager: System Architecture Set to ' + node_type);
    pinAction.setup(node_type);
}
//Initialize Exit Options
let exitOpt = require('./config/exitOpt.js');
setTimeout(exitOpt.testCheck, 3000);
//End of System Config Checks - - - - - - - - - - - - - -

//Declare App
const app = express();
app.set('view engine', 'ejs');

//Other Processes Setup
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
    res.json({ node_id: storage.get('node_id'), node_hostname: os.hostname(), node_type: storage.get('sys_arch') });
}
//Receive Setup config from LEMAConsole
function agentSetup(req, res) {
    console.log(req.body["console_ip"]);
    if ( req.body["console_ip"] === undefined || req.body["console_secret"] === undefined ) {
        console.log('ERROR: Not all parameters sent');
        res.json({ setupStat: 'failure', node_id: storage.get('node_id') });
    } else {
        res.json({ setupStat: 'success', node_id: storage.get('node_id') });
        storage.set('setup_status', 'true');
        storage.set('console_ip', req.body["console_ip"]);
        storage.set('console_secret', req.body["console_secret"]);
    }
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
