/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/material.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let lemaengine = process.env.LEMAENGINE || process.argv[3];

//Main Page Route - Dashboard
exports.dashMain =  function(req, res) {
    res.render('pages/dashboard_main.ejs', { title: 'Dashboard', lemaengine: lemaengine })
};