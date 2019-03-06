/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/nodeResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let node = require('../models/nodeModel.js');
let nodePen = require('../models/nodePenModel.js');
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

//List NodePen Devices
exports.list_nodepens = function (req, res) {
    nodePen.find({}, function (err, listed_nodes) {
        if (err) {
            console.log("NODE Resolver: Retrieve failed: " + err);
            res.send(err);
        } else {
            if (debug_mode === "true") { console.log("NODE Resolver: NodePens Sent: " + JSON.stringify(listed_nodes)) }
        }
        res.json(listed_nodes);
    });
};

//Update Scan Range for Node Discovery
exports.update_scanrange = function (req, res) {
    storage.set('node_search_rangeStart', req.body["start_range"]);
    storage.set('node_search_rangeEnd', req.body["end_range"]);
    res.json('success');
};