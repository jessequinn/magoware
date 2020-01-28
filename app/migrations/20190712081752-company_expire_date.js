'use strict';

var winston = require('winston');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('settings', 'expire_date', {
      type: Sequelize.DATE,
      allowNull: false
    })
    .catch(function(err) {winston.error(err)});
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('settings', 'expire_date')
      .catch(function(err) {winston.error(err)});
  }
};
