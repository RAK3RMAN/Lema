/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/models/nodePenModel.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let mongoose = require('mongoose');

let nodependingSchema = mongoose.Schema({
    node_hostname: String,
    node_ip: String,
    node_type: String,
    node_id: {
        type: String,
        default: "N/A",
    },
    node_status: {
        type: String,
        default: "pending",
    },
});

module.exports = mongoose.model('nodePending', nodependingSchema);