'use strict';
var winston = require('winston')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("app_management", "availability_denominator", {
      type: Sequelize.INTEGER(11),
      defaultValue: 1
    }).catch(function(err) {
      winston.error(err)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("app_management", "availability_denominator")
      .catch(function(err) {
        winston.info(err)
      });
  }
};
