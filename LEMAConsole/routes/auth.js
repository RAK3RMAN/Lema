/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/auth.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Login Page Route - Auth
exports.loginPage =  function(req, res) {
    res.render('pages/login.ejs', { title: 'Login' })
};

//Signup Page Route - Auth
exports.signupPage =  function(req, res) {
    res.render('pages/sign_up.ejs', { title: 'Sign Up', message: req.flash('signupMessage') })
};