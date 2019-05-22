/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAgent/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let fs = require('fs');
let cmd = require('node-cmd');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let pinConfig = new dataStore({path: './config/pinConfig.json'});

//Pin Action Function Setup
module.exports.setup = function () {
    //Pin Config Setup Check
    let testPin = pinConfig.get('pin01');
    if (testPin === undefined && storage.get('sys_arch')) {
        modelPins(storage.get('sys_arch'));
        console.log('Lema Pin Config Manager: pinConfig.json modeled for Raspberry Pi');
    }
    //Check pin configuration upon setup
    checkPins(storage.get('sys_arch'));
};

//Pin Action Function
module.exports.pinUpdate = function (pin, action) {
    console.log("PIN:" + pin + " ACTION:" + action);
};

//Check Pin Status
function checkPins(arch) {
    if (arch === "raspberryPi") {
        let pinData = JSON.parse(fs.readFileSync('./config/pinConfig.json'));
        for (let i in pinData) {
            if (pinData[i].slice(0,3) !== "NA/") {
                cmd.get(
                    "gpio -1 read " + i.slice(3,5),
                    function(err, data, stderr){
                        if (err) {
                            console.log("LEMAgent | Error in Reading Pins: " + err)
                        } else {
                            if (pinData[i] === "UNDEF") {
                                pinConfig.set(i, 'D-IN--' + data);
                            } else if (pinData[i].slice(0,6) === "D-IN--") {
                                pinConfig.set(i, 'D-IN--' + data);
                            } else if (pinData[i].slice(0,6) === "D-OUT-") {
                                pinConfig.set(i, 'D-OUT-' + data);
                            } else {
                                pinConfig.set(i, 'UNDEF');
                            }
                        }
                    }
                );
            }
        }
    } else {
        console.log('LEMAgent | Cannot check pins due to system architecture...')
    }
}

//Model Pins to Default
function modelPins(arch) {
    if (arch === "raspberryPi") {
        pinConfig.set('pin01', 'NA/3.3V');
        pinConfig.set('pin02', 'NA/5V');
        pinConfig.set('pin03', 'NA/SDA');
        pinConfig.set('pin04', 'NA/5V');
        pinConfig.set('pin05', 'NA/SCL');
        pinConfig.set('pin06', 'NA/GND');
        pinConfig.set('pin07', 'UNDEF');
        pinConfig.set('pin08', 'NA/TxD');
        pinConfig.set('pin09', 'NA/GND');
        pinConfig.set('pin10', 'NA/RxD');
        pinConfig.set('pin11', 'UNDEF');
        pinConfig.set('pin12', 'UNDEF');
        pinConfig.set('pin13', 'UNDEF');
        pinConfig.set('pin14', 'NA/GND');
        pinConfig.set('pin15', 'UNDEF');
        pinConfig.set('pin16', 'UNDEF');
        pinConfig.set('pin17', 'NA/3.3V');
        pinConfig.set('pin18', 'UNDEF');
        pinConfig.set('pin19', 'NA/MOSI');
        pinConfig.set('pin20', 'NA/GND');
        pinConfig.set('pin21', 'NA/MISO');
        pinConfig.set('pin22', 'UNDEF');
        pinConfig.set('pin23', 'NA/SCLK');
        pinConfig.set('pin24', 'NA/CE0');
        pinConfig.set('pin25', 'NA/GND');
        pinConfig.set('pin26', 'NA/CE1');
        pinConfig.set('pin27', 'NA/SDA0');
        pinConfig.set('pin28', 'NA/SCL0');
        pinConfig.set('pin29', 'UNDEF');
        pinConfig.set('pin30', 'NA/GND');
        pinConfig.set('pin31', 'UNDEF');
        pinConfig.set('pin32', 'UNDEF');
        pinConfig.set('pin33', 'UNDEF');
        pinConfig.set('pin34', 'NA/GND');
        pinConfig.set('pin35', 'UNDEF');
        pinConfig.set('pin36', 'UNDEF');
        pinConfig.set('pin37', 'UNDEF');
        pinConfig.set('pin38', 'UNDEF');
        pinConfig.set('pin39', 'NA/GND');
        pinConfig.set('pin40', 'UNDEF');
    }
}