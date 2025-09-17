/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  
  // primaryKey: 'id',

  // dontUseObjectIds: true,

  attributes: {
    // id: {
    //   type: 'string',
    //   columnName: '_id'
    // },
    name: { type: 'string', required: true, unique: true },
    price: { type: 'number', required: true },
  },

};

