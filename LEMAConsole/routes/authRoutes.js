/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/authRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let cmd = require('node-cmd');
let mongoose = require('mongoose');
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});
let debug_mode = storage.get('debug_mode');
let user = require('../models/userModel.js');
let bcrypt = require('bcrypt-nodejs');

//Login Page Route - Auth
exports.loginPage = function (req, res) {
    res.render('pages/login.ejs', {title: 'Login', theme: 'white'})
};

//Admin Settings Page Route - Auth
exports.adminsettingsPage = function (req, res) {
    res.render('pages/admin_settings.ejs', {
        title: 'Admin Settings',
        user: req.user,
        theme: req.user.details.console_theme
    })
};

//User Settings Page Route - Auth
exports.usersettingsPage = function (req, res) {
    res.render('pages/settings_user.ejs', {
        title: 'User Settings',
        user: req.user,
        theme: req.user.details.console_theme
    })
};

//Setup - System Check Route - Auth
exports.systemCheck = function (req, res) {
    if (storage.get('setup_status') === false) {
        let overallCheck = 'One or more system checks failed';
        let npmCheck = 'passed';
        let setupvarCheck = 'System has already been setup';
        let sysvarCheck = 'Not all variables needed for setup are present';
        let mongoDBCheck = 'Users already exist in MongoDB';
        let internetCheck = 'Cannot connect to the internet through 8.8.8.8';
        cmd.get(
            "npm install",
            function (err, data, stderr) {
                if (err) {
                    console.log('LEMA System Check | NPM Packages Install Failed' + err);
                    npmCheck = 'failed';
                }
            }
        );
        if (storage.get('setup_status') === false) {
            setupvarCheck = 'passed';
        }
        if (storage.get('session_secret') && storage.get('console_port') && storage.get('mongodb_url') && storage.get('debug_mode') && storage.get('public_secret')) {
            sysvarCheck = 'passed';
        }
        cmd.get(
            "ping -c 1 8.8.8.8 | grep 100%",
            function (err, data, stderr) {
                if (data.length !== 0) {
                    console.log('LEMA System Check | Internet Connectivity Failed' + err);
                } else {
                    internetCheck = 'passed';
                }
                if (mongoose.connection.readyState === 0) {
                    mongoDBCheck = 'passed';
                    if ('passed' === npmCheck && 'passed' === setupvarCheck && 'passed' === sysvarCheck && 'passed' === mongoDBCheck && 'passed' === internetCheck) {
                        overallCheck = 'passed';
                    }
                    res.json({
                        overallCheck: overallCheck,
                        npmCheck: npmCheck,
                        setupvarCheck: setupvarCheck,
                        sysvarCheck: sysvarCheck,
                        mongoDBCheck: mongoDBCheck,
                        internetCheck: internetCheck
                    });
                } else {
                    user.find({}, function (err, listed_users) {
                        if (listed_users.length === 0) {
                            mongoDBCheck = 'passed';
                        }
                        if ('passed' === npmCheck && 'passed' === setupvarCheck && 'passed' === sysvarCheck && 'passed' === mongoDBCheck && 'passed' === internetCheck) {
                            overallCheck = 'passed';
                        }
                        res.json({
                            overallCheck: overallCheck,
                            npmCheck: npmCheck,
                            setupvarCheck: setupvarCheck,
                            sysvarCheck: sysvarCheck,
                            mongoDBCheck: mongoDBCheck,
                            internetCheck: internetCheck
                        });
                    })
                }
            }
        );
    }
};

//Setup - System Setup Route - Auth
exports.systemSetup = function (req, res) {
    if (storage.get('setup_status') === false) {
        storage.set('mongodb_url', req.body["mongodb_url"]);
        storage.set('console_port', req.body["console_port"]);
        mongoose.connect(storage.get('mongodb_url'), {useNewUrlParser: true, connectTimeoutMS: 10000});
        let newUser = new user();
        newUser.local.email = req.body["email"];
        newUser.local.password = newUser.generateHash(req.body["password"]);
        newUser.details.first_name = req.body["first_name"];
        newUser.details.last_name = req.body["last_name"];
        newUser.save(function (err, created_user) {
            if (err) {
                console.log("USER Resolver: Save failed: " + err);
                res.send(err);
            } else {
                if (debug_mode === "true") {
                    console.log('USER Resolver: User Created: ' + JSON.stringify(created_user))
                }
                storage.set('setup_status', true);
            }
            res.json('success');
        });
    }
};

