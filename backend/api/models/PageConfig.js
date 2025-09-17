/**
 * PageConfig.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    pageKey: {
      type: 'string',
      required: true,
      unique: true,
      description: 'Unique identifier for the page configuration',
    },

    title: {
      type: 'string',
      required: true,
      description: 'Title of the page',
    },

    form: {
      type: 'json',
      description: 'Config dynamic form (input fields) for the page',
    },

    grid: {
      type: 'json',
      description: 'Config dynamic table (columns, sorting, filtering) for the page', 
    }, 

    button: {
      type: 'json',
      description: 'Config dynamic buttons for the page',
    },

    apiEndpoints: {
      type: 'json',
      description: 'Config API endpoints for the page',
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true,
      description: 'Indicates if the page configuration is active',
    },

    createdBy: {
      model: 'user',
      description: 'Reference to the user who created this page configuration',
    },

    description: {
      type: 'string',
      allowNull: true,
      description: 'Optional description for the page configuration',
    },

  },

};

