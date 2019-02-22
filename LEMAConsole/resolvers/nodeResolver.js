/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/nodeResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
var node = require('../models/nodeModel.js');

//Create Node Device
exports.create_node = function (req, res) {
    let newNode = new node(req.body);
    console.log(JSON.stringify(newNode));
    console.log(req.body);
    //newNode.save(function (err, node) {
    //    if (err)
    //       res.send(err);
    //    res.json(node);
    //    console.log('Created Node: ' + node);
    //});
    res.json(node);
}

//List Node Devices
//exports.list_nodes = function (req, res) {
//    
//}