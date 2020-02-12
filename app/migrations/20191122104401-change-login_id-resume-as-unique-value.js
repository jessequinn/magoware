'use strict';
var winston = require('winston');

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.removeIndex('vod_resume', 'vod_resume_login_id_unique').then(function (removed_old_index) {
            winston.info("Successfully removed old index login_id ");
        }).catch(function(error){
            winston.error("Removing old index login_id failed with error: ",error.message);
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.addIndex('vod_resume', ['login_id', 'vod_resume_login_id_unique'], {
            name: 'login_id',
            unique: true
        }).then(function (added_old_index) {
            winston.error("Successfully added old index login_id");
        }).catch(function(error){
            winston.error("Adding old index login_id failed with error: ",error.message);
        });
    }
};