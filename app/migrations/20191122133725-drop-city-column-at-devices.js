'use strict';
var winston = require('winston');
module.exports = {

    up: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('devices','city').catch(function (err) {
            winston.error('Dropping column city failed with error message: ', err.message);
        });
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
