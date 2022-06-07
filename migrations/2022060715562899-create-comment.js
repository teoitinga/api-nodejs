'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        type: Sequelize.STRING 
      }, 
      comments: {
        type: Sequelize.STRING
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING
      },
      to: {
        allowNull: false,
        type: Sequelize.STRING
      },
      previous: {
        type: Sequelize.STRING
      },
      taskid: {
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
    await queryInterface.dropTable('Comments');
  }
};