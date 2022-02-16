'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Themes', [
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D399',
        description: 'Administradores da empresa contratante',
        class: 'ADMINISTRATIVO',
        type: 'ADMIN',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
        description: 'Programas direcionados ao setor agropecuário',
        class: 'AGROPECUARIA',
        type: 'AGRO',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Themes', null, {});
  }
};
