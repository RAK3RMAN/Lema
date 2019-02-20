/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/models/nodeModel.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
var mongoose = require('mongoose');

var nodeSchema = mongoose.Schema({
    raspberryPi      : {
        nodeName     : String,
        password     : String,
    },
});

module.exports = mongoose.model('node', nodeSchema);
