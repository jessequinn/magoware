'use strict';

var winston = require('winston');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('vod_resume', 'seen_details', {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            }).catch(function (err) {
                winston.error(err);
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('vod_resume', 'seen_details'),
        ]).catch(function(err) {
            winston.error(err)
        })
    }
};