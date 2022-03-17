'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
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
      action_id: {
        type: Sequelize.STRING
      },
      treatment_id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      userDesigned_id: {
        type: Sequelize.STRING
      },
      qtd: {
        type: Sequelize.INTEGER,
      },
      valor: {
        type: Sequelize.DECIMAL(10,2),
      },
      createdby: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedby: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Tasks');
  }
};