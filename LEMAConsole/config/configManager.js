/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/config/configManager.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
const uuidv4 = require('uuid/v4');
const dataStore = require('data-store');
const storage = new dataStore({path: './config/sysConfig.json'});

//System Config Checks - - - - - - - - - - - - - - - - - 

//Session Secret Check
let session_secret = storage.get('session_secret');
if (session_secret == undefined) {
    console.log('Lema Config Manager: Auto Config for Session Secret Started');
    let newSecret = uuidv4();
    storage.set('session_secret', newSecret);
    console.log('Lema Config Manager: Session Secret Set - ' + newSecret);
}

//Console Port Check
let console_port = storage.get('console_port');
if (console_port == undefined) {
    console.log('Lema Config Manager: Auto Config for Console Port Started');
    storage.set('console_port', 3000);
    console.log('Lema Config Manager: Console Port Set to DEFAULT: 3000');
}

//MongoDB URL Check
let mongodb_url = storage.get('mongodb_url');
if (mongodb_url == undefined) {
    console.log('Lema Config Manager: Auto Config for MongoDB URL Started');
    storage.set('mongodb_url', 'mongodb://localhost:27017');
    console.log('Lema Config Manager: MongoDB URL Set to DEFAULT: mongodb://localhost:27017');
}

//Debug Mode Check
let debug_mode = storage.get('debug_mode');
if (debug_mode == undefined) {
    console.log('Lema Config Manager: Auto Config for Debug Mode Started');
    storage.set('debug_mode', 'false');
    console.log('Lema Config Manager: Debug Mode Set to DEFAULT: false');
}

//End of System Config Checks - - - - - - - - - - - - - -
