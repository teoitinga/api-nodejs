'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'itensfinanciados',
      'risked',
      {
        type: Sequelize.DATE,
        allowNull: true,
      },
      )
      
    },
    async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('itensfinanciados', 'risked')
  }
};
