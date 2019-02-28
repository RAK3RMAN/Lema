/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAgent/app.js
Description  : Initializes nodejs, websocket
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//===================================================//
//     --- Initialize Packages and Routers ---       //
//===================================================//

//Declare Packages
let ip = require('ip');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//End of Initialize Packages and Routers - - - - - - - -

module.exports = app;