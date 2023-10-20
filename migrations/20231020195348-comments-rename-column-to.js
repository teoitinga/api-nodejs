'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Comments', 'to', 'touser');
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Comments', 'touser', 'to');
  }
};
