'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('crpropostas', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        type: Sequelize.STRING 
      }, 
      banco: {
        type: Sequelize.STRING(30)
      },
      linha: {
        type: Sequelize.STRING(30)
      },
      anoprimpgm: {
        type: Sequelize.DATE
      },
      anoultpgm: {
        type: Sequelize.DATE
      },
      txjurosaa: {
        type: Sequelize.DECIMAL(4,2)
      },
      rda: {
        type: Sequelize.DECIMAL(4,2)
      },
      rdaok: {
        type: Sequelize.DATE
      },
      trt: {
        type: Sequelize.DECIMAL(4,2)
      },
      trtok: {
        type: Sequelize.DATE
      },
      obs: {
        type: Sequelize.STRING(50)
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
    await queryInterface.dropTable('crpropostas');
  }
};