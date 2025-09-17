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
    'GET /api/auth/profile': 'AuthController.profile',

    'GET /api/page-configs': 'PageConfigController.find',
    'GET /api/page-configs/:pageKey': 'PageConfigController.findOne',
    'POST /api/page-configs': 'PageConfigController.create',
    'PUT /api/page-configs/:pageKey': 'PageConfigController.update',
    'DELETE /api/page-configs/:pageKey': 'PageConfigController.destroy',

    'GET /api/users': 'UserController.find',
    'GET /api/users/:id': 'UserController.findOne',
    'POST /api/users': 'UserController.create',
    'PUT /api/users/:id': 'UserController.update',
    'DELETE /api/users/:id': 'UserController.destroy',
    'PUT /api/users/assign-role': 'UserController.assignRole',

    'GET /api/roles': 'RoleController.find',

    'GET /api/products': 'ProductController.find',
    'GET /api/products/:id': 'ProductController.findOne',
    'POST /api/products': 'ProductController.create',
    'PUT /api/products/:id': 'ProductController.update',
    'DELETE /api/products/:id': 'ProductController.destroy',
};
