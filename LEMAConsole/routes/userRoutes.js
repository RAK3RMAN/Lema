/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/userRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

module.exports = function (app) {
    let auth = require('../resolvers/authResolver.js');
    let user = require('../resolvers/userResolver.js');

    app.route('/api/user/theme')
        .post(auth.isLoggedIn, user.change_theme)

};
