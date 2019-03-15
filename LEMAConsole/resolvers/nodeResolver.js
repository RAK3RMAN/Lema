/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/nodeResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let node = require('../models/nodeModel.js');
let request = require('request');
let ip = require('ip');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');

//Create Node Device
exports.create_node = function (req, res) {
    let newNode = new node(req.body);
    newNode.save(function (err, created_node) {
        if (err) {
            console.log("NODE Resolver: Save failed: " + err);
            res.send(err);
        } else {
            if (debug_mode === "true") { console.log('NODE Resolver: Node Created: ' + JSON.stringify(created_node)) }
        }
        res.json(created_node);
    });
};

//List Node Devices
exports.list_nodes = function (req, res) {
    node.find({}, function (err, listed_nodes) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
            res.send(err);
        } else {
            if (debug_mode === "true") { console.log("NODE Resolver: Nodes Sent: " + JSON.stringify(listed_nodes)) }
        }
        res.json(listed_nodes);
    });
};

//Conduct setup functions for node running LEMAgent
exports.agent_setup = function (req, res) {
    node.find({ node_id: req.body["node_id"] }, function (err, nodeData) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
            res.send(err);
        } else {
            let agent_url = "http://" + nodeData[0]["node_ip"] + ":3030/lema-agent/setup";
            let agent_config = {
                url: agent_url,
                body: {
                    console_ip: "http://" + ip.address() + ":" + storage.get('console_port'),
                    console_secret: '61862295-77ca-4088-967a-e3969d744db8'
                },
                json: true,
            };
            console.log("NODE Discovery: Sent parameters to node: " + agent_config);
            request.post(agent_config, function (err, response, body) {
                if (err) {
                    console.log('NODE Discovery: ERROR in Reaching Node: ', err);
                    res.status(500).send('error');
                } else if (response.statusCode === 200) {
                    console.log('NODE Discovery: Response from node: ' + body);
                    if (body["setupStat"] === "success") {
                        node.findOneAndUpdate({ node_id: req.body["node_id"] }, { $set: { node_status: 'unknown' }}, function (err, data) {
                            if (err || data == null) {
                                console.log("NODE Resolver: Retrieve failed: " + err);
                                res.status(500).send('error');
                            } else {
                                console.log("NODE Resolver: Node Status Updated: " + data);
                                res.json(nodeData);
                            }
                        });
                    } else {
                        console.log('NODE Discovery: Setup not successful. Please see logs above for resolution.');
                        res.status(500).send('error');
                    }
                }
            });
        }
    });
};

//Get Scan Range
let topRangeSend;
let bottomRangeSend;
exports.get_scanrange = function (req, res) {
    varSet.find({}, function (err, var_data) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
            res.send(err);
        } else {
            for (let i in var_data) {
                if (var_data[i]["var_name"] === "node_search_rangeStart") {
                    topRangeSend = var_data[i]["var_value"];
                }
                if (var_data[i]["var_name"] === "node_search_rangeEnd") {
                    bottomRangeSend = var_data[i]["var_value"];
                }
            }
        }
        res.json({ rangeStart: topRangeSend, rangeEnd: bottomRangeSend })
    });
};

//Update Scan Range for Node Discovery
exports.update_scanrange = function (req, res) {
    var_Updater('node_search_rangeStart', req.body["start_range"]);
    var_Updater('node_search_rangeEnd', req.body["end_range"]);
    res.json({ start_range: req.body["start_range"], end_range: req.body["end_range"] })
};

//Update Variables to DB
let varSet = require('../models/varModel.js');
function var_Updater(var_name, var_value) {
    varSet.findOneAndUpdate({ var_name: var_name }, { $set: { var_value: var_value }}, function (err, data) {
        if (err) {
            console.log("VAR Resolver: Retrieve failed: " + err);
        }
        if (data == null) {
            console.log('test');
            let newVar = new varSet({ var_name: var_name, var_value: var_value });
            newVar.save(function (err, created_var) {
                if (err) {
                    console.log("VAR Resolver: Save failed: " + err);
                } else {
                    if (debug_mode === "true") { console.log('VAR Resolver: VAR Created: ' + JSON.stringify(created_var)) }
                }
            });

        } else {
            if (debug_mode === "true") {
                console.log("VAR Resolver: " + var_name + " Updated: " + var_value)
            }
        }
    });
}