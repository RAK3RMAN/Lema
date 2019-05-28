/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/userResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let user = require('../models/userModel.js');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');
let bcrypt = require('bcrypt-nodejs');

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

//Edit the user details
//TODO Enforce rule that logged in user can only update their account unless admin
exports.update_user = function (req, res) {
     function generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
    user.findOneAndUpdate({ _id: req.body["_id"] }, { "$set": { "local.email": req.body["email"], "local.password": generateHash(req.body["password"]), "details.first_name": req.body["first_name"], "details.last_name": req.body["last_name"] } }, function (err, updatedUser) {
        if (err) {
            console.log("AUTH Resolver: Update failed: " + err);
            res.send(err);
        } else {
            console.log("AUTH Resolver: User Updated: " + updatedUser);
            res.json('success');
        }
    });
};