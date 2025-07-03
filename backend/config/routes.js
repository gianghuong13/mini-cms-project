/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'GET /api/ping': 'PingController.ping',

    'POST /api/auth/register': 'AuthController.register',
    'POST /api/auth/login': 'AuthController.login',

    'GET /api/products': 'ProductController.find',
    'GET /api/products/:id': 'ProductController.findOne',
    'POST /api/products': 'ProductController.create',
    'PUT /api/products/:id': 'ProductController.update',
    'DELETE /api/products/:id': 'ProductController.destroy',
};
