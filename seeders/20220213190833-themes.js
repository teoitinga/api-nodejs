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
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D390',
        description: 'trata de assuntos relacionados ao gerenciamento de pessoal/funcionários',
        class: 'RECURSOS HUMANOS',
        type: 'RH',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D391',
        description: 'assuntos relacionados ao gerenciamento de dados da saude',
        class: 'SAUDE',
        type: 'SAUDE',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D392',
        description: 'assuntos relacionados ao gerenciamento de dados do esporte',
        class: 'ESPORTE',
        type: 'ESPORTE',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D393',
        description: 'assuntos relacionados ao gerenciamento de dados da cultura',
        class: 'CULTURA',
        type: 'CULTURA',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D394',
        description: 'assuntos relacionados ao gerenciamento de dados sociais',
        class: 'SOCIAL',
        type: 'SOCIAL',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D395',
        description: 'assuntos relacionados ao gerenciamento de dados da educação',
        class: 'EDUCACAO',
        type: 'EDUCACAO',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Themes', null, {});
  }
};
