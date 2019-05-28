/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/authResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//User Auth Check
exports.isLoggedIn = function (req, res, next) {
    // If authorized, allow request
    if (req.isAuthenticated())
        return next();
    // If unauthorized, redirect to login page
    if (storage.get('setup_status') === false) {
        res.redirect('/setup');
    } else {
        res.redirect('/login');
    }
};
