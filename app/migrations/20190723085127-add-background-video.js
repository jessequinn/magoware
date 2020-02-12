'use strict';

var winston = require('winston');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('settings', 'background_video_url', {
        type: Sequelize.STRING(255),
      }),
      queryInterface.addColumn('settings', 'background_video_duration', {
        type: Sequelize.INTEGER,
      }),
    ])
    .catch(function(err) {
      winston.error(err)
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('settings', 'background_video_url'),
      queryInterface.removeColumn('settings', 'background_video_duration'),
    ])
    .catch(function(err) {
      winston.error(err);
    })
  }
};
