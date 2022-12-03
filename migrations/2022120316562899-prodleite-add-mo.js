'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'leiteprods',
      'maodeobrautilizada',
      {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      )
      
    },
    async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('leiteprods', 'maodeobrautilizada')
  }
};