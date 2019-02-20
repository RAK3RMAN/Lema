/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/authResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

exports.isLoggedIn = function (req, res, next) {
    // If authorized, allow request
    if (req.isAuthenticated())
        return next();
    // If unauthorized, redirect to login page
    res.redirect('/login');
}
