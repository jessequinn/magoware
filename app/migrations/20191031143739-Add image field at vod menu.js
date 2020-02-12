'use strict';
const winston = require('winston');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('vod_menu', 'icon_url', {type: Sequelize.STRING(255), allowNull: true})
      .catch(function (err) {
        winston.error('Adding icon_url to vod menu failed with error message: ', err.message);
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('vod_menu', 'icon_url')
      .catch(function (err) {
        winston.error('Removing column icon_url to vod menu failed with error message:: ', err.message);
      });
  }
};
