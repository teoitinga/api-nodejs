'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Actions', {
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
      referency: {
        type: Sequelize.STRING
      },

      project_id: {
        type: Sequelize.STRING
      },
      objetivo: {
        type: Sequelize.TEXT,
      },
      qtdAtendimentos: {
        type: Sequelize.INTEGER,
      },
      valorPorAtendimento: {
        type: Sequelize.DECIMAL(10,2),
      },
      start: {
        allowNull: true,
        type: Sequelize.DATE
      },
      end: {
        allowNull: true,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Actions');
  }
};