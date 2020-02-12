'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise(function(resolve, reject) {
      queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=0')
        .then(function() {
          queryInterface.changeColumn('settings', 'id', {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            unique: true
          }).then(function() {
            queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS=1')
              .then(function() {
                resolve();
              }).catch(function(error) {
                reject(error);
              })
          }).catch(function(err) {
            reject(err)
          })
        }).catch(function(error) {
          reject(error)
        })
    })
  },

  down: (queryInterface, Sequelize) => {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  }
};
