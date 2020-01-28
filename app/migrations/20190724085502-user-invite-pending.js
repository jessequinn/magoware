'use strict';

var winston = require('winston');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'invite_pending', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }).catch(function(err) {
      winston.error(err);
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'invite_pending').catch(function(err) {
      winston.error(err)
    })
  }
};
