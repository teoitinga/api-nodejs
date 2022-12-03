'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('leiteprods', 'customensalestimado')


  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'leiteprods',
      'customensalestimado',
      {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    )
  }
};