/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/config/configManager.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
const uuidv4 = require('uuid/v4');
const dataStore = require('data-store');
const storage = new dataStore({path: './config/sysConfig.json'});

//System Config Checks - - - - - - - - - - - - - - - - - 

//Node ID Check
let node_id = storage.get('node_id');
if (node_id == undefined) {
    console.log('Lema Config Manager: Auto Config for Node ID Started');
    let newSecret = uuidv4();
    storage.set('node_id', newSecret);
    console.log('Lema Config Manager: Node ID Set - ' + newSecret);
}

//LEMAConsole Secret Check
let console_secret = storage.get('console_secret');
if (console_secret == undefined) {
    console.log('Lema Config Manager: Auto Config for LEMAConsole Secret Started');
    storage.set('console_secret', '');
    console.log('Lema Config Manager: LEMAConsole Secret Set to DEFAULT');
}

//Setup Status Check
let setup_status = storage.get('setup_status');
if (setup_status == undefined) {
    console.log('Lema Config Manager: Auto Config for Setup Status Started');
    storage.set('setup_status', 'false');
    console.log('Lema Config Manager: Setup Status Set to DEFAULT - false');
}

//LEMAConsole IP Check
let console_ip= storage.get('console_ip');
if (console_ip == undefined) {
    console.log('Lema Config Manager: Auto Config for LEMAConsole IP Started');
    storage.set('console_ip', '');
    console.log('Lema Config Manager: LEMAConsole IP Set to DEFAULT');
}

//End of System Config Checks - - - - - - - - - - - - - -
