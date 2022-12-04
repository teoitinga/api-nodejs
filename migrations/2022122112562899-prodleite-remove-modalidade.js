'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('crpropostas', 'modalidade')


  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'crpropostas',
      'modalidade',
      {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    )
  }
};