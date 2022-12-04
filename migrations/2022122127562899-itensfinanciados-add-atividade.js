'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      'itensfinanciados',
      'atividade',
      {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      )
      
    },
    async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('itensfinanciados', 'atividade')
  }
};