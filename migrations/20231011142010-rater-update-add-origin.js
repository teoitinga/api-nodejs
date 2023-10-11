'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'r_aters',
      'origin_id',
      {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      )
      
    },
    async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('r_aters', 'origin_id')
  }
};
 