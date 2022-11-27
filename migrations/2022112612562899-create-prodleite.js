'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LeiteProds', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        type: Sequelize.STRING 
      }, 
      totalrebanho: {
        type: Sequelize.INTEGER
      },
      totalvacas: {
        type: Sequelize.INTEGER
      },
      totalvacasord: {
        type: Sequelize.INTEGER
      },
      producaodiaria: {
        type: Sequelize.INTEGER
      },
      precoporlitro: {
        type: Sequelize.DECIMAL(4,2)
      },
      suplementacao: {
        type: Sequelize.STRING(50)
      },
      percentvendabezerros: {
        type: Sequelize.INTEGER
      },
      percentboigordo: {
        type: Sequelize.INTEGER
      },
      customensalestimado: {
        type: Sequelize.INTEGER
      },
      forrageiratipo: {
        type: Sequelize.STRING(50)
      },
      forrageiraarea: {
        type: Sequelize.INTEGER
      },
      maodeobracontratada: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('LeiteProds');
  }
};