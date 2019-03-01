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

//Setup Status Check
let setup_status= storage.get('setup_status');
if (setup_status == undefined) {
    console.log('Lema Config Manager: Auto Config for Setup Status Started');
    storage.set('setup_status', 'false');
    console.log('Lema Config Manager: Setup Status Set to DEFAULT - false');
}

//End of System Config Checks - - - - - - - - - - - - - -
