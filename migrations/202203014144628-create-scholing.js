'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schoolings', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING(50) 
      }, 
      schooling: {
        type: Sequelize.STRING(30)
      },
      created: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schoolings');
  }
};