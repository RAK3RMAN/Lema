/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/nodeResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
var node = require('../models/nodeModel.js');

//Create Node Device
exports.create_node = function (req, res) {
    let newNode = new node(req.body);
    console.log(JSON.stringify(new_node));
    //new_node.save(function (err, node) {
    //    if (err)
    //       res.send(err);
    //    res.json(node);
    //    console.log('Created Node: ' + node);
    //});
}

//List Node Devices
exports.list_nodes = function (req, res) {
    // If authorized, allow request
    if (req.isAuthenticated())
        return next();
    // If unauthorized, redirect to login page
    res.redirect('/login');
}