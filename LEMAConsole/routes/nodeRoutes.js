/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/routes/nodeRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

module.exports = function (app) {
    let auth = require('../resolvers/authResolver.js');
    let node = require('../resolvers/nodeResolver.js');

    app.route('/api/node/create')
        .post(auth.isLoggedIn, node.create_node);

    app.route('/api/node/details')
        .get(auth.isLoggedIn, node.node_details);

    app.route('/api/node/details/all')
        .get(auth.isLoggedIn, node.node_details_all);

    app.route('/api/node/edit')
        .post(auth.isLoggedIn, node.node_edit);

    app.route('/api/node/scan_range')
        .get(auth.isLoggedIn, node.get_scanrange)
        .post(auth.isLoggedIn, node.update_scanrange)

    app.route('/api/node/setup')
        .post(auth.isLoggedIn, node.agent_setup);

    app.route('/api/node/hide')
        .post(auth.isLoggedIn, node.hide_node);

};