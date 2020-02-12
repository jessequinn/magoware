'use strict';

var winston = require('winston');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('genre', 'order', {
                type: Sequelize.INTEGER(11),
                allowNull: false
            }).catch(function (err) {
                winston.error(err);
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('genre', 'order')
        ]).catch(function(err) {
            winston.error(err)
        })
    }
};
