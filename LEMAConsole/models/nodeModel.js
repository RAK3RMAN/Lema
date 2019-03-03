/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/models/nodeModel.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
var mongoose = require('mongoose');

var nodeSchema = mongoose.Schema({
    node_name: String,
    node_ip: String,
    node_type: String,
    node_id: {
        type: String,
        default: "N/A",
    },
    node_status: {
        type: String,
        default: "offline",
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('node', nodeSchema);