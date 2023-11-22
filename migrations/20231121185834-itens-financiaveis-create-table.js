'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('itensfinanciaveis', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        type: Sequelize.STRING
      },
      representacaobd: {
        type: Sequelize.STRING
      },
      atividade: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING,
        unique: true,
      },
      unidade: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('itensfinanciaveis');
  }
};