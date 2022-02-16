'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: 'AASDKHADADA-ADSDLAKDJLAKDS-ASDADASDAS',
      name: 'João Paulo Santana Gusmão',
      registry: '04459471604',
      email: 'teo.itinga@gmail.com',
      role_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
      partner_id: '',
      division_id: '',
      password: '$2b$10$xgztY3N/fmRp36BRv7bwfePv6Lg4a1Wwlc3TJHPWynjZ.b9Jv5BLO',
      address: 'Trv. Augusto de lima',
      num: '22',
      district: 'Centro',
      complement: 'Casa',
      city: 'Itinga',
      uf: 'MG',
      cep: '35140000',
      phone: '33999065029',
      expiresDate: '2050-01-04 23:20:10',
      created: Sequelize.fn('now'),
      lockedDate: null,
      createdby: 'instalation',
      updatedby: ''

    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
