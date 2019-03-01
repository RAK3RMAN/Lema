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
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//Declare App
const app = express();
app.set('view engine', 'ejs');

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
app.post('/lema-agent/release', agentRelease);

//Broadcast Agent Information
function agentBroadcast(req, res) {
    res.json({ node_id: storage.get('node_id') });
}
//Receive Setup config from LEMAConsole
function agentSetup(req, res) {
    let agentConfig = req.body;
    console.log(agentConfig);
    res.json({ setupStat: 'success', node_id: storage.get('node_id'), node_arch: 'type' });
}
//Remove LEMAConsole configuration, release, and await setup
function agentRelease(req, res) {
    let releaseCode = req.body;
    console.log(releaseCode);
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
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //Render Error Page
    res.status(err.status || 500);
    res.render('pages/error.ejs', {title: 'Error'});
});

//End of Error Handler - - - - - - - - - - - - - - - - -


//===================================================//
//               --- Port Listen ---                 //
//===================================================//

let http = require('http');
let client = http.createServer(app);
client.listen(3030, function () {
    console.log(' ');
    console.log('===========================================');
    console.log(' LEMAgent ~ Startup | Created By: RAk3rman ');
    console.log('===========================================');
    console.log('Lema Agent Broadcasting at: ' + ip.address() + ":3030");
    console.log(' ');
});

//Declare Console Functions
let configManager = require('./config/configManager.js');

//End of Port Listen - - - - - - - - - - - - - - - - -


//===================================================//
//           --- Socket.io Functions ---             //
//===================================================//

let io = require('socket.io-client');
let socket = io.connect('http://localhost:3000');
socket.on('connect', function () {
    console.log('Connected');
    socket.emit('server custom event', { my: 'data' });
});

//End of Socket.io Functions - - - - - - - - - - - - - -

module.exports = app;