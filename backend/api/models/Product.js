/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'products',
  primaryKey: 'id',

  dontUseObjectIds: true,

  attributes: {
    id: {
      type: 'string',
      columnName: '_id'
    },
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
  },

};

