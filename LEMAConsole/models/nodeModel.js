/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/models/nodeModel.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let mongoose = require('mongoose');

let nodeSchema = mongoose.Schema({
    node_name: {
        type: String,
        required: true,
    },
    node_ip: {
        type: String,
        required: true,
    },
    node_type: {
        type: String,
        required: true,
    },
    node_id: {
        type: String,
        default: "NOT SET",
    },
    node_status: {
        type: String,
        default: "unknown",
    },
    socket_id: {
        type: String,
        default: "N/A",
    },
    pin_config: {
        type: Object,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('node', nodeSchema);