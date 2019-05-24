/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/nodeResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let node = require('../models/nodeModel.js');
let requests = require('../models/requestsModel.js');
let moment = require('moment');
let request = require('request');
let ip = require('ip');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');
let socket = require('./socketResolver.js');

//Get details for dashboard
exports.dash_details = function (req, res) {
    //Set Variables
    let connectedNodes = 0;
    let totalConsoleNodes = 0;
    let pendingNodes = 0;
    let hiddenNodes = 0;
    let totalRequests = 0;
    let startRange;
    let endRange;
    let recentConnect;
    let recentInbound;
    let recentOutbound;
    node.find({}, function (err, listed_nodes) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
        }
        for (let i in listed_nodes) {
            //Connected Nodes Card
            //Nodes on Console Card
            if (listed_nodes[i]["node_status"] === "online") {
                connectedNodes = connectedNodes + 1;
                totalConsoleNodes += 1;
            } else if (listed_nodes[i]["node_status"] === "offline") {
                totalConsoleNodes += 1;
            } else if (listed_nodes[i]["node_status"] === "unknown") {
                totalConsoleNodes += 1;
            } else if (listed_nodes[i]["node_status"] === "pending") {
                pendingNodes += 1;
            } else if (listed_nodes[i]["node_status"] === "hidden") {
                hiddenNodes += 1;
            }
        }
        requests.find({}, function (err, listed_requests) {
            if (err) {
                console.log("NODE Resolver: Retrieve failed: " + err);
            }
            //Node Requests Card
            for (let i in listed_requests) {
                //Node Requests Card
                if (listed_requests[i]["created_date"] > moment().startOf('day').subtract(1,'week')) {
                    totalRequests += 1;
                }
            }
            //Get recent updates for each request class
            let recentConnectData = listed_requests.map(function(Request){
                if (Request.class === "connection" || "disconnection") {
                    return moment(Request.created_date, 'DD.MM.YYYY');
                }
            });
            let recentInboundData = listed_requests.map(function(Request){
                if (Request.class === "inbound") {
                    return moment(Request.created_date, 'DD.MM.YYYY');
                }
            });
            let recentOutboundData = listed_requests.map(function(Request){
                if (Request.class === "outbound") {
                    return moment(Request.created_date, 'DD.MM.YYYY');
                }
            });
            if (recentConnectData.filter(Boolean).length === 0) {
                recentConnect = null;
            }  else {
                recentConnect = moment.max(recentConnectData.filter(Boolean));
            }
            if (recentInboundData.filter(Boolean).length === 0) {
                recentInbound = null;
            }  else {
                recentInbound = moment.max(recentInboundData.filter(Boolean));
            }
            if (recentOutboundData.filter(Boolean).length === 0) {
                recentOutbound = null;
            }  else {
                recentOutbound = moment.max(recentOutboundData.filter(Boolean));
            }
            //Nodes on Network Card
            varSet.find({}, function (err, var_data) {
                if (err) {
                    console.log("NODE Resolver: Retrieve failed: " + err);
                } else {
                    for (let i in var_data) {
                        if (var_data[i]["var_name"] === "node_search_rangeStart") {
                            startRange = var_data[i]["var_value"];
                        }
                        if (var_data[i]["var_name"] === "node_search_rangeEnd") {
                            endRange = var_data[i]["var_value"];
                        }
                    }
                    //Send JSON Data
                    res.json({
                        nodeList: listed_nodes,
                        connectedNodes: connectedNodes,
                        totalConsoleNodes: totalConsoleNodes,
                        totalNetworkNodes: listed_nodes.length,
                        totalRequests: totalRequests,
                        recentConnect: recentConnect,
                        recentInbound: recentInbound,
                        recentOutbound: recentOutbound,
                        pendingNodes: pendingNodes,
                        hiddenNodes: hiddenNodes,
                        startRange: startRange,
                        endRange: endRange,
                    })
                }
            });
        });
    });
    //Inbound Requests Graph
    //Node Connected Graph
    //Outbound Requests Graph
};

//Create a new node
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

//Give details about the node requested
exports.node_details = function (req, res) {
    console.log(req.query.node_id);
    node.find({ node_id: req.query.node_id }, function (err, details) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
            res.send(err);
        } else {
            if (debug_mode === "true") { console.log("NODE Resolver: Nodes Sent: " + JSON.stringify(details)) }
        }
        res.json(details);
    });
};

//List all nodes in database
exports.node_details_all = function (req, res) {
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

//Edit an existing node
exports.node_edit = function (req, res) {
    node.findOneAndUpdate({ node_id: req.body["node_id"] }, { $set: req.body }, function (err, updatedNode) {
        if (err) {
            console.log("NODE Resolver: Update failed: " + err);
            res.send(err);
        } else {
            console.log("NODE Resolver: Node Updated: " + updatedNode);
            res.json(updatedNode);
        }
    });
};

//Setup a node running LEMAgent
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
                    console_secret: storage.get('public_secret')
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

//Set the status of a node to hidden
exports.hide_node = function (req, res) {
    let io = socket.exportIO;
    node.findOneAndUpdate({ node_id: req.body["node_id"] }, { $set: { node_status: 'hidden' }}, function (err, data) {
        if (err || data == null) {
            console.log("NODE Resolver: Retrieve failed: " + err);
            res.status(500).send('error');
        } else {
            console.log("NODE Resolver: Node Status Updated: " + data);
            res.json(data);
        }
    });
    if (req.body["socket_id"]) {
        io.to(req.body["socket_id"]).emit('release', req.body["node_id"]);
        setTimeout(function () {
            node.findOneAndUpdate({ node_id: req.body["node_id"] }, { $set: { node_status: 'hidden' }}, function (err, data) {
                if (err || data == null) {
                    console.log("NODE Resolver: Retrieve failed: " + err);
                } else {
                    console.log("NODE Resolver: Node Status Updated: " + data);
                }
            });
        }, 2000);
    }
};

//Get scan range of node discovery tool
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

//Set scan range of node discovery tool
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