'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Modes', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        type: Sequelize.STRING 
      }, 
      description: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      maxDivision: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maxUsers: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valueContract: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      vigencyMonths: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('Modes');
  }
};