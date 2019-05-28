/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/authRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Login Page Route - Auth
exports.loginPage = function (req, res) {
    res.render('pages/login.ejs', {title: 'Login', theme: 'white'})
};

//Signup Page Route - Auth
exports.signupPage = function (req, res) {
    res.render('pages/sign_up.ejs', {title: 'Sign Up', theme: 'white'})
};

//User Settings Page Route - Auth
exports.usersettingsPage = function (req, res) {
    res.render('pages/settings_user.ejs', {title: 'User Settings', user: req.user, theme: req.user.details.console_theme})
};

//Admin Settings Page Route - Auth
exports.adminsettingsPage = function (req, res) {
    res.render('pages/admin_settings.ejs', {title: 'Admin Settings', user: req.user, theme: req.user.details.console_theme})
};

