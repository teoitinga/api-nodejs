'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('itensfinanciados', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        type: Sequelize.STRING 
      }, 
      finalidade: {
        type: Sequelize.STRING(30)
      },
      descricao: {
        type: Sequelize.STRING(30)
      },
      unidade: {
        type: Sequelize.STRING(10)
      },
      qtditemfinanc: {
        type: Sequelize.DECIMAL(4,2)
      },
      valorunit: {
        type: Sequelize.DECIMAL(4,2)
      },
      idproposta: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('itensfinanciados');
  }
};