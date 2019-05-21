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
        default: {
            "pin01": "NA/3.3V",
            "pin02": "NA/5V",
            "pin03": "NA/SDA",
            "pin04": "NA/5V",
            "pin05": "NA/SCL",
            "pin06": "NA/GND",
            "pin07": "UNDEF",
            "pin08": "NA/TxD",
            "pin09": "NA/GND",
            "pin10": "NA/RxD",
            "pin11": "UNDEF",
            "pin12": "UNDEF",
            "pin13": "UNDEF",
            "pin14": "NA/GND",
            "pin15": "UNDEF",
            "pin16": "UNDEF",
            "pin17": "NA/3.3V",
            "pin18": "UNDEF",
            "pin19": "NA/MOSI",
            "pin20": "NA/GND",
            "pin21": "NA/MISO",
            "pin22": "UNDEF",
            "pin23": "NA/SCLK",
            "pin24": "NA/CE0",
            "pin25": "NA/GND",
            "pin26": "NA/CE1",
            "pin27": "NA/SDA0",
            "pin28": "NA/SCL0",
            "pin29": "UNDEF",
            "pin30": "NA/GND",
            "pin31": "UNDEF",
            "pin32": "UNDEF",
            "pin33": "UNDEF",
            "pin34": "NA/GND",
            "pin35": "UNDEF",
            "pin36": "UNDEF",
            "pin37": "UNDEF",
            "pin38": "UNDEF",
            "pin39": "NA/GND",
            "pin40": "UNDEF",
        },
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('node', nodeSchema);