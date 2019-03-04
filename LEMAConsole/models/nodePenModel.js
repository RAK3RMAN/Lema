/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/models/nodePenModel.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let mongoose = require('mongoose');

let nodepenSchema = mongoose.Schema({
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
    created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('nodePen', nodepenSchema);