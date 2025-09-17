/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    password: {
      type: 'string',
      required: true,
      // protect: true
    },
    name: {
      type: 'string',
      allowNull: true
    },
    roles: {
      collection: 'role',
      via: 'users'
    }
  },

  // customToJSON: function () {
  //   return _.omit(this, ['password']);
  // }

};

