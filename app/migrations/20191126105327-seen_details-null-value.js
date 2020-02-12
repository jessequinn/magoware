'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('alter table vod_resume modify seen_details BOOLEAN null;')
            .catch(function(err) {

            })
    },

    down: (queryInterface, Sequelize) => {
        return Promise.resolve();
    }
};

