/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/resolvers/nodeResolver.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

exports.create_node = function (req, res) {
    // If authorized, allow request
    if (req.isAuthenticated())
        return next();
    // If unauthorized, redirect to login page
    res.redirect('/login');
}