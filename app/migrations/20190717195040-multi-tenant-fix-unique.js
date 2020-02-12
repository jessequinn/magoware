'use strict';

var winston = require('winston');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query('ALTER TABLE advanced_settings DROP index advanced_settings_parameter_id_unique')
      .catch(function(err){winston.error(err)}),
      queryInterface.sequelize.query('ALTER TABLE advanced_settings ADD constraint company_parameter_id_unique UNIQUE(company_id, parameter_id)')
      .catch(function(err){winston.error(err)}),
      queryInterface.sequelize.query('ALTER TABLE advanced_settings DROP index parameter_id')
      .catch(function(err){winston.error(err)}),
      queryInterface.sequelize.query('ALTER TABLE groups DROP index code')
      .catch(function(err){winston.error(err)}),
      queryInterface.sequelize.query('ALTER TABLE groups DROP index groups_name_unique')
      .catch(function(err){winston.error(err)}),
      queryInterface.sequelize.query('ALTER TABLE groups DROP index groups_code_unique')
      .catch(function(err){winston.error(err)}),
      queryInterface.sequelize.query("ALTER TABLE groups ADD CONSTRAINT company_name_code_unique UNIQUE(company_id, name, code)")
      .catch(function(err) {winston.error(err)})
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(function(t) { 
      return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0', {transaction: t})
        .then(function() {
          return Promise.all([
            queryInterface.sequelize.query("ALTER TABLE advanced_settings ADD constraint advanced_settings_parameter_id_unique UNIQUE(parameter_id)")
              .catch(function() {}),
              queryInterface.sequelize.query('ALTER TABLE advanced_settings DROP index company_parameter_id_unique')
                .catch(function(err) {}),
            queryInterface.sequelize.query('ALTER TABLE groups ADD CONSTRAINT code UNIQUE(code)')
              .catch(function(err){}),
            queryInterface.sequelize.query('ALTER TABLE groups ADD CONSTRAINT groups_name_unique UNIQUE(name)')
              .catch(function(err){}),
            queryInterface.sequelize.query('ALTER TABLE groups ADD CONSTRAINT groups_code_unique UNIQUE(code)')
              .catch(function(err){}),
              queryInterface.sequelize.query("ALTER TABLE groups DROP INDEX company_name_code_unique")
              .catch(function(err) {winston.error(err)})
          ]);
        })
    })
    .then(function() {
      queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=1')
    })
    .catch(function(err) {winston.error(err)})
  }
};
