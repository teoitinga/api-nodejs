'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: 'ASDKHADADA-ADSDLAKDJLAKDS-ASDADASDAS',
      name: 'Jpão Paulo Santana Gusmão',
      registry: '04459471604',
      email: 'teo.itinga@gmail.com',
      role_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
      partner_id: '',
      division_id: '',
      password: '$2b$10$xgztY3N/fmRp36BRv7bwfePv6Lg4a1Wwlc3TJHPWynjZ.b9Jv5BLO',
      address: '',
      city: '',
      phone: '',
      expiresDate: '2022-03-23',
      lockedDate: null,
      createdby: '',
      updatedby: ''

    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
