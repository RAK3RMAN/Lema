/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/material.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let lemaengine = process.env.LEMAENGINE || process.argv[3];

//Dashboard Page Route - Material
exports.dashMain =  function(req, res) {
    res.render('pages/dashboard_main.ejs', { title: 'Dashboard', lemaengine: lemaengine, user: req.user })
};