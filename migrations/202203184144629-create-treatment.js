'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Treatments', {
      id: { 
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        type: Sequelize.STRING 
      }, 
      local: {
        type: Sequelize.STRING,
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE
      },
      situacao: {
        type: Sequelize.TEXT
      },
      orientacao: {
        type: Sequelize.TEXT
      },
      recomendacao: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Treatments');
  }
};