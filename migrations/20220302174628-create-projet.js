'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
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
      representative_id: {
        type: Sequelize.STRING
      },
      partner_id: {
        type: Sequelize.STRING,
      },
      division_id: {
        type: Sequelize.STRING,
      },
      objetivo: {
        type: Sequelize.TEXT,
      },
      publicoAlvo: {
        type: Sequelize.TEXT,
      },
      justificativa: {
        type: Sequelize.TEXT,
      },
      resultado: {
        type: Sequelize.TEXT,
      },
      city: {
        type: Sequelize.STRING(150),
      },

      lockedDate: {
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
    await queryInterface.dropTable('Projects');
  }
};