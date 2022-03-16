'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schoolings', [
      {
        id: 'fa70047e-a407-11ec-b909-0242ac120002',
        schooling: 'Ensino Fundamental',
      },
      {
        id: '3db7bec4-be70-4f24-8a95-670157960862',
        schooling: 'Alfabetizado',
      },
      {
        id: 'bd6963c8-83ea-4826-9551-d59b0d3d19e5',
        schooling: 'Analfabeto',
      },
      {
        id: '51f69189-3b8e-4cdc-b6dd-ac9a1cae1f01',
        schooling: 'Ensino médio',
      },
      {
        id: 'ea78db36-4681-4dd1-95e1-659ac468d359',
        schooling: 'Ensino médio incompleto',
      },
      {
        id: '61adfb53-dc6f-4fe6-b5ed-d0e00ed3bd3e',
        schooling: 'Ensino superior',
      },
      {
        id: '9f4be2c4-231e-40c0-b561-ac1f1166a2cd',
        schooling: 'Ensino superior incompleto',
      },
      {
        id: 'f1eeefbc-0ac8-4601-b779-abced42b8ae5',
        schooling: 'Pós graduação',
      },
      {
        id: '8887cb87-366a-4f44-a9b0-4eae0e5d7b26',
        schooling: 'Outros',
      }

    ], {});
  },
 
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schoolings', null, {});
  }
};
