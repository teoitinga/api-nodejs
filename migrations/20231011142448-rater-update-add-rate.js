'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'r_aters',
      'rate',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      )
      
    },
    async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('r_aters', 'rate')
  }
};
