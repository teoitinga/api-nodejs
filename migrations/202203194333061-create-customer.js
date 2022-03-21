'use strict'; 
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        type: Sequelize.STRING 
      }, 
      name: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING(11),
      },
      birth_date: {
        defaultValue: null,
        type: Sequelize.DATEONLY
      },
      role_id: {
        type: Sequelize.STRING
      },
      partner_id: {
        type: Sequelize.STRING
      },
      division_id: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING(50)
      },
      num: {
        type: Sequelize.STRING(3)
      },
      district: {
        type: Sequelize.STRING(50)
      },
      complement: {
        type: Sequelize.STRING(50)
      },
      city: {
        type: Sequelize.STRING(50)
      },
      uf: {
        type: Sequelize.STRING(2)
      },
      cep: {
        type: Sequelize.STRING(8)
      },
      phone: {
        type: Sequelize.STRING(13)
      },
      expiresDate: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Customers');
  }
};