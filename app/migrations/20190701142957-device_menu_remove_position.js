'use strict';

var winston = require('winston');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0; ')
    .then(function() {
      queryInterface.sequelize.query('ALTER TABLE device_menu DROP INDEX position;')
      .then(function() {
        queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=1')
        .then(function(err) {
          queryInterface.sequelize.query('ALTER TABLE device_menu DROP INDEX position_2').catch(function(err) {
            winston.error(err);
          });
        })
        .catch(function(err) {
          winston.error(err);
        });
      }).catch(function(err) {
        winston.error(err);
      });
    }).catch(function(err) {
      winston.error(err);
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0; ')
      .then(function() {
        queryInterface.sequelize.query('ALTER TABLE device_menu ADD CONSTRAINT position UNIQUE(company_id, position)')
        .then(function() {
          queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=1')
          .catch(function(err) {
            winston.error(err);
          });
        }).catch(function(err) {
          winston.error(err);
        })
      }).catch(function(err) {
        winston.error(err);
      })
  }
};
