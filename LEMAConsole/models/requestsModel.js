/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/models/requestsModel.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let mongoose = require('mongoose');

let requestsSchema = mongoose.Schema({
    class: {
        type: String,
        required: true,
    },
    node_associated: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('requests', requestsSchema);