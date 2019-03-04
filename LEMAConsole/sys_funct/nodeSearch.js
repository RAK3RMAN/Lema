/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/sys_funct/nodeSearch.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let cmd = require('node-cmd');
let request = require('request');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');

//Find Nodes
exports.findNodes = function (range) {
    cmd.get(
        "evilscan " + range + " --port=3030 --status=O --json",
        function(err, data, stderr){
            let preProcess = data.replace(/}/g, "}, ");
            let formattedData = JSON.parse("[" + preProcess.slice(0, -3) + "]");
            for (let i in formattedData) {
                console.log("NODE Discovery: Found Node with IP: " + formattedData[i]["ip"]);
                gatherInfo(formattedData[i]["ip"]);
            }
        }
    );
};

//Gather Information about Node
function gatherInfo(ip) {
    let url = "http://" + ip + ":3030/lema-agent/broadcast";
    request.post(url, function (err, response, body) {
        if (err) {
            console.log('NODE Discovery: ERROR in Data Extraction: ', error);
        }
        if (response.statusCode === 200) {
            let nodeData = JSON.parse(body);
            console.log("NODE Discovery: Extracted ID from Node: " + nodeData["node_id"]);
        }
    });
}