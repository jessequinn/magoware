'use strict';
var winston = require('winston');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(function(t){
            return queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS=0", {transaction: t}).then(function() {
                return Promise.all([
                    //add company_id to the unique key position in table device_menu
                    queryInterface.sequelize.query('ALTER TABLE `device_menu` DROP INDEX position', {transaction: t}).then(function(success1){
                        return queryInterface.sequelize.query('ALTER TABLE `device_menu` ADD CONSTRAINT position UNIQUE (company_id, position);', {transaction: t}).catch(function(error){winston.error(erro);});
                    }).catch(function(error){winston.error(error);}),
                    //todo: add company_id to the unique key templateid_language in table email_templates
                    queryInterface.sequelize.query('ALTER TABLE `email_templates` DROP INDEX templateid_language;', {transaction: t}).then(function(success1){
                        return queryInterface.sequelize.query('ALTER TABLE `email_templates` ADD CONSTRAINT templateid_language UNIQUE (company_id, template_id, language);', {transaction: t}).catch(function(err){winston.error(err);});
                    }).catch(function(error){winston.error(error);})
                    //todo: add company_id to the unique key parameter_id key in table advanced_settings
                    //todo: add company_id to the unique key xxxx in table html_content
                ])
            })
        }).then(function() {
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=1');
        })
          .catch(function(error){
            winston.error(error);
            return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=1');
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(function(t){
            return Promise.all([
                //remove company_id from the unique key position in table device_menu
                queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0;').then(function(success){
                    return queryInterface.sequelize.query('ALTER TABLE `device_menu` DROP INDEX position;').then(function(success){
                        return queryInterface.sequelize.query('ALTER TABLE `device_menu` ADD CONSTRAINT position UNIQUE (position);').catch(function(error){winston.error(error);})
                    }).catch(function(error){winston.error(error);})
                }).catch(function(error){winston.error(error);}),
                //remove company_id from the unique key templateid_language in table email_templates
                queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0').then(function(success){
                    return queryInterface.sequelize.query('ALTER TABLE `email_templates` DROP INDEX templateid_language;').then(function(success){
                       return queryInterface.sequelize.query('ALTER TABLE `email_templates` ADD CONSTRAINT templateid_language UNIQUE (template_id, language);')
                        .catch(function(error){winston.error(error);})
                    }).catch(function(error){winston.error(error);})
                }).catch(function(error){winston.error(error);})
                //remove company_id from the unique key parameter_id in table advanced_settings
                //remove company_id from the unique key xxxx in table html_content
            ])
        }).then(function() {
            queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=1');
        })
        .catch(function(error){
            queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=1');
            winston.error(error);
        });
    }
};