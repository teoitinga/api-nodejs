'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Comments', 'from', 'fromuser');
  },
  
  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Comments', 'fromuser', 'from');
  }
};
 