'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agroindustriaprods', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        type: Sequelize.STRING 
      }, 
      treatmentId: {
        type: Sequelize.STRING
      },
      origemmp: {
        type: Sequelize.STRING(50)
      },
      produto: {
        type: Sequelize.STRING(50)
      },
      produtoUnid: {
        type: Sequelize.STRING(10)
      },
      materiaprima: {
        type: Sequelize.STRING(50)
      },
      materiaprimaunid: {
        type: Sequelize.STRING(10)
      },
      situacaocertif: {
        type: Sequelize.STRING(50)
      },
      tipoagro: {
        type: Sequelize.STRING(50)
      },
      mesfimprod: {
        type: Sequelize.INTEGER
      },
      mesinicioprod: {
        type: Sequelize.INTEGER
      },
      ppmp: {
        type: Sequelize.INTEGER
      },
      prdanual: {
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
    await queryInterface.dropTable('agroindustriaprods');
  }
};