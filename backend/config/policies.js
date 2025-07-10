/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const RoleController = require("../api/controllers/RoleController");

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': false,

  AuthController: {
    login: true,
    register: true, 
    profile: ['isAuthenticated']
  },

  UserController: {
    '*': ['isAuthenticated', 'hasPermission']
  },

  RoleController: {
    '*': ['isAuthenticated', 'hasPermission']
  },

  ProductController: {
    '*': ['isAuthenticated', 'hasPermission']
  },

};
