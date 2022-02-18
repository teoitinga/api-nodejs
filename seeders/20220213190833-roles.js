'use strict';

const moment = require("moment");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D401',
        description: 'Destinada ao proprietário da plataforma Ares',
        class: 10,
        type: 'MASTER_ARES',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D400',
        description: 'Destinada a administradores da plataforma Ares',
        class: 9,
        type: 'ADM_ARES',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D398',
        description: 'Diretores/Gestores da empresa. É a pessoa responsável por gerir a empresa e tem acesso a todos os dados e relatórios referentes a sua empresa de todos os departamentos',
        class: 7,
        type: 'GESTOR',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D396',
        description: 'Supervisores da empresa. Tem acesso a todos os dados referentes a sua empresa de todos os departamentos/divisões podendo realizar consultas e inserir registros.',
        class: 6,
        type: 'AUDIT',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D394',
        description: 'Funcionários da empresa diretores ou Supervisores de departamento. tem acesso a todos os dados referentes a sua divisão.',
        class: 4,
        type: 'DIRETOR',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D393',
        description: 'Funcionários da empresa diretores ou Supervisores de departamento. tem acesso a todos os dados referentes a sua divisão.',
        class: 3,
        type: 'SUPERVISOR',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D392',
        description: 'Funcionários da empresa proprietária que podem fazer os registros',
        class: 2,
        type: 'FUNCIONARIO',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D391',
        description: 'Funcionários/Cedidos que fazem os registros sob supervisão',
        class: 1,
        type: 'CEDIDO',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      },
      {
        id: 'FF19491D-B9A4-417A-8D70-CFFCB1D7D389',
        description: 'Destinada ao público em geral, seu acesso é bastante restrito',
        class: 0,
        type: 'PUBLICO',
        createdby: '',
        updatedby: '',
        created: '2022-02-13'
      }
    ], {});
  },
 
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
