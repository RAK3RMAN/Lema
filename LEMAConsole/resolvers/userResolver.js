/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/userResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let user = require('../models/userModel.js');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');

//Edit the user console theme
exports.change_theme = function (req, res) {
    user.findOneAndUpdate({ _id: req.body["userID"] }, { "$set": { "details.console_theme": req.body["theme"] } }, function (err, updatedUser) {
        if (err) {
            console.log("AUTH Resolver: Update failed: " + err);
            res.send(err);
        } else {
            console.log("AUTH Resolver: User Updated: " + updatedUser);
            res.json('success');
        }
    });
};