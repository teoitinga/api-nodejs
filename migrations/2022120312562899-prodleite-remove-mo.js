'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('leiteprods', 'maodeobracontratada')


  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'leiteprods',
      'maodeobracontratada',
      {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    )
  }
};