/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/sys_funct/nodeSearch.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let cmd = require('node-cmd');
let request = require('request');
let node = require('../models/nodeModel.js');
let requests = require('../models/requestsModel.js');
let cronJob = require('cron').CronJob;
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');
let topRange = "127.0.0.1";
let bottomRange = "127.0.0.1";

// Check for New Nodes every 15 seconds
new cronJob('*/15 * * * * *', function() {
    let varSet = require('../models/varModel.js');
    //Get Vars from DB
    varSet.find({}, function (err, var_data) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
        } else {
            for (let i in var_data) {
                if (var_data[i]["var_name"] === "node_search_rangeStart") {
                    topRange = var_data[i]["var_value"];
                }
                if (var_data[i]["var_name"] === "node_search_rangeEnd") {
                    bottomRange = var_data[i]["var_value"];
                }
            }
        }
    });
    //Run Scanner to find devices
    cmd.get(
        "evilscan " + topRange + "-" + bottomRange + " --port=3030 --status=O --json",
        function(err, data, stderr){
            let preProcess = data.replace(/}/g, "}, ");
            let formattedData = JSON.parse("[" + preProcess.slice(0, -3) + "]");
            for (let i in formattedData) {
                if (debug_mode === "true") { console.log("NODE Discovery (1): Found Node with IP: " + formattedData[i]["ip"]); }
                gatherInfo(formattedData[i]["ip"]);
            }
        }
    );
}, null, true, 'America/Chicago');

//Gather Information about Node
function gatherInfo(ip) {
    let url = "http://" + ip + ":3030/lema-agent/broadcast";
    request.post(url, function (err, response, body) {
        if (err) {
            console.log('NODE Discovery: ERROR in Data Extraction: ', err);
        } else if (response.statusCode === 200) {
            let nodeData = JSON.parse(body);
            if (debug_mode === "true") { console.log("NODE Discovery (2): Extracted ID from Node: " + nodeData["node_id"]) }
            //Search database to see if Node exists
            node.find({ node_id: nodeData["node_id"] }, function (err, data) {
                if (err) {
                    console.log("NODE Resolver: Retrieve failed: " + err);
                }
                if (data.length === 0) {
                    createNodePen(nodeData["node_hostname"], ip, nodeData["node_type"], nodeData["node_id"]);
                } else {
                    if (debug_mode === "true") { console.log('NODE Discovery: Node already exists in database...') }
                }
            });
        }
    });
}

//Create NodePen upon Verification
function createNodePen(hostname, ip, type, id) {
    let newNode = new node({
        node_name: hostname,
        node_ip: ip,
        node_type: type,
        node_id: id,
        node_status: 'pending',
    });
    newNode.save(function (err, created_node) {
        if (err) {
            console.log("NODE Resolver: Save failed: " + err);
        } else {
            if (debug_mode === "true") { console.log('NODE Discovery (3): NodePen Created: ' + JSON.stringify(created_node)) }
            logRequest('outbound', nodeData["node_id"], 'outbound broadcast request for node details');
        }
    });
}

//Log request
function logRequest(class_sent, node_associated, details) {
    let newRequest = new requests({
        class: class_sent,
        node_associated: node_associated,
        details: details
    });
    newRequest.save(function (err, created_request) {
        if (err) {
            console.log("REQUEST Resolver: Save failed: " + err);
        } else {
            if (debug_mode === "true") { console.log('REQUEST Resolver: Request Created: ' + JSON.stringify(created_request)) }
        }
    });
}