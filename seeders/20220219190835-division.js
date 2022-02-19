'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Divisions', [
      {
      id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
      name: 'Departamento de Agricultura',
      nickname: 'Agro +',
      registry: '01123600000164',
      email: 'teo.itinga@gmail.com',
      representative_id: '10639',
      partner_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
      address:'Rua Feliciana, 32',
      phone: '3332331530',
      city: 'Tarumirim',
      theme: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
      expiresDate: '2050-01-04 23:20:10',
      createdby: 'AASDKHADADA-ADSDLAKDJLAKDS-ASDADASDAS',
      created: '2022-02-16'
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Divisions', null, {});
  }
};
