/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/nodeResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
var node = require('../models/nodeModel.js');

//Create Node Device
exports.create_node = function(req, res) {
    let newNode = new node(req.body);
    newNode.save(function(err, node) {
        if (err) {
            console.log("Save failed:" + err);
        } else {
        	console.log('Node Created: ' + JSON.stringify(node));
        }
    });
    res.json(node);
}

//List Node Devices
//exports.list_nodes = function (req, res) {
//    
//}