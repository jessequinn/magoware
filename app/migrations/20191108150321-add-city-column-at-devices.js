'use strict';

var winston = require('winston');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('devices', 'city', {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: 'city'
            }).catch(function (err) {
                winston.error(err);
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('devices', 'city'),
        ]).catch(function(err) {
            winston.error(err)
        })
    }
};
