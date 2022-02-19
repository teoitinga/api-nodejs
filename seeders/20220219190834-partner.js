'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Partners', [
      {
      id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
      name: '3Conn - Three Connection',
      nickname: '3con',
      registry: '01123600000164',
      email: 'teo.itinga@gmail.com',
      idRepresentative: '106397',
      address:'',
      phone: '',
      city: '',
      expiresDate: '2050-01-04 23:20:10',
      createdby: 'AASDKHADADA-ADSDLAKDJLAKDS-ASDADASDAS',
      created: '2022-02-16'
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Partners', null, {});
  }
};
