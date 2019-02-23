/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/models/nodeModel.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
var mongoose = require('mongoose');

var nodeSchema = mongoose.Schema({
    node_name: String,
    node_ip: String,
    node_type: String,
});

module.exports = mongoose.model('node', nodeSchema);