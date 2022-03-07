'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', [
      {
        id: 'H0684',
        city: 'Tarumirim',
        uf: 'MG',
      },
      {
        id: 'H0685',
        city: 'Alvarenga',
        uf: 'MG',
      },
      {
        id: 'H0686',
        city: 'Inhapim',
        uf: 'MG',
      },
      {
        id: 'H0687',
        city: 'Itinga',
        uf: 'MG',
      },
      {
        id: 'H0689',
        city: 'Araçuaí',
        uf: 'MG',
      },
      {
        id: 'H0690',
        city: 'Itaobim',
        uf: 'MG',
      },
      {
        id: 'H0688',
        city: 'Pinheiros',
        uf: 'ES',
      },
    ], {});
  },
 
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
