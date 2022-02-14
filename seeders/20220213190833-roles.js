'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [{
      id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
      description: 'Diretor de divisão ou departamento',
      class: 8,
      type: 'DIRETOR',
      createdby: '',
      updatedby: '',
      created: '2022-02-13'
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
