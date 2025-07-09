/**
 * Permission.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: { 
    action: {
      type: 'string',
      required: true,
      isIn: ['create', 'read', 'update', 'delete', 'manage']
    },
    resource: {
      type: 'string',
      required: true,
    },
    roles: {
      collection: 'role',
      via: 'permissions'
    }
  },

  customToJSON: function () {
    return ({
      id: this.id,
      permission: `${this.resource}:${this.action}`
    });
  }

};



