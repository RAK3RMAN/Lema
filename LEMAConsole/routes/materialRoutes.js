/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/materialRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//Dashboard Page Route - Material
exports.dashMain = function (req, res) {
    res.render('pages/dashboard_main.ejs', {title: 'Dashboard', user: req.user, theme: req.user.details.console_theme})
};

//Nodes List Page Route - Material
exports.nodeList = function (req, res) {
    res.render('pages/node_list.ejs', {title: 'Node List', user: req.user, theme: req.user.details.console_theme});
};

//Nodes Details Page Route - Material
exports.nodeDetails = function (req, res) {
    res.render('pages/node_details.ejs', {title: 'Node Details', user: req.user, nodeID: req.params.nodeID, theme: req.user.details.console_theme});
};

//System Setup Page Route - Material
exports.sysSetup = function (req, res) {
    if (storage.get('setup_status') === false) {
        res.render('pages/sys_setup.ejs', {title: 'Setup', theme: 'white'})
    }
};