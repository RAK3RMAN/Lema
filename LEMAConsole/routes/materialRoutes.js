/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/materialRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Dashboard Page Route - Material
exports.dashMain =  function(req, res) {
    res.render('pages/dashboard_main.ejs', { title: 'Dashboard', user: req.user })
};

//System Setup Page Route - Material
exports.sysSetup =  function(req, res) {
    res.render('pages/sys_setup.ejs', { title: 'Setup' })
};