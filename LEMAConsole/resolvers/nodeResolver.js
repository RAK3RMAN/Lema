/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/nodeResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
var node = require('../models/nodeModel.js');

//Create Node Device
exports.create_node = function (req, res) {
    let newNode = new node();
    if (req.body[2] == "raspberryPi") {
        newNode.raspberryPi.node_name = req.body[0];
        newNode.raspberryPi.node_ip = req.body[1];
        newNode.raspberryPi.node_type = req.body[2];
    }
//    newNode.save(function (err, node) {
//        if (err) {
//           return res.json({status: 500, error: err});
//        }
//        res.json(node);
//        console.log('Created Node: ' + node);
//    });
//    res.json(node);
}

//List Node Devices
//exports.list_nodes = function (req, res) {
//    
//}