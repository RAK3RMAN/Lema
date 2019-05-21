/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAgent/resolvers/socketResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let jwt = require('jwt-simple');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let pinConfig = new dataStore({path: './config/pinConfig.json'});

//Pin Action Function Setup
module.exports = function setup() {
    //Pin Config Setup Check
    let pinconfigSetup = storage.get('pinconfigSetup');
    if (pinconfigSetup === undefined && storage.get('node_id')) {
        storage.set('pinconfigSetup', 'raspberryPi');
        modelPins(storage.get('pinconfigSetup'));
        console.log('Lema Pin Config Manager: pinConfig.json modeled for Raspberry Pi');
    }
    //Check pin configuration upon setup
    checkPins(storage.get('pinconfigSetup'));
};

//Pin Action Function
module.exports = function pinUpdate(pin, action) {
    console.log("PIN:" + pin + " ACTION:" + action);
};

//Check Pin Status
function checkPins(arch) {
    if (arch === "raspberryPi") {

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