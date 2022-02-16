'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Modes', [
      {
      id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
      description: 'Plano básico inicial',
      nickname: 'PRIMARY',
      maxDivision: 2,
      maxUsers: 10000,
      valueContract: 5400,
      vigencyMonths:12,
      created: '2022-02-16'
    },
      {
      id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D399',
      description: 'Plano intermediário',
      nickname: 'COMMON',
      maxDivision: 3,
      maxUsers: 10000,
      valueContract: 14520.35,
      vigencyMonths:12,
      created: '2022-02-16'
    },
      {
      id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7DD40',
      description: 'Plano avançado',
      nickname: 'INTELLIGENCE',
      maxDivision: 5,
      maxUsers: 10000,
      valueContract: 21780,
      vigencyMonths:12,
      created: '2022-02-16'
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modes', null, {});
  }
};
