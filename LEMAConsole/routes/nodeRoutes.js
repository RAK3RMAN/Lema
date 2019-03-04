/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/nodeRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

module.exports = function (app) {
    let auth = require('../resolvers/authResolver.js');
    let node = require('../resolvers/nodeResolver.js');

    app.route('/api/node/create')
        .post(auth.isLoggedIn, node.create_node);

    app.route('/api/node/list')
        .get(auth.isLoggedIn, node.list_nodes);

    app.route('/api/nodepen/list')
        .get(auth.isLoggedIn, node.list_nodepens);
};