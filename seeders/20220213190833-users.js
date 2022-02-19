'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 'AASDKHADADA-ADSDLAKDJLAKDS-ASDADASDAS',
        name: 'João Paulo Santana Gusmão - Admin',
        registry: '04459471604',
        email: 'teo.itinga@gmail.com',
        role_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D401',
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

      },
      {
        id: 'AASDKHADADA-ADSDLAKDJLAKDS-ASDADASDA',
        name: 'João Paulo Santana Gusmão - Gestor',
        registry: '106397',
        email: 'teo.itinga@gmail.com',
        role_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
        partner_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
        division_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
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

      },
      {
        id: 'AASDKHADADA-ADSDLAKDJLAKDS-ASDADASDSA',
        name: 'João Paulo Santana Gusmão - Diretor',
        registry: '10639',
        email: 'teo.itinga@gmail.com',
        role_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D394',
        partner_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
        division_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
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
      },
      {
        id: 'AASDKHADADA-ADSDLAKDJLAKDS-ASDADASDUSA',
        name: 'João Paulo Santana Gusmão - User',
        registry: '1063',
        email: 'teo.itinga@gmail.com',
        role_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D392',
        partner_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
        division_id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
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
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
