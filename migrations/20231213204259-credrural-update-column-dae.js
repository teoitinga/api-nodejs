'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.changeColumn(
      'crpropostas',
      'rda',
      {
        type: Sequelize.DECIMAL(8,2),
        allowNull: true,
      },
      )
      
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn('crpropostas', 'rda', 
      {
        type: Sequelize.DECIMAL(4,2),
        allowNull: true,
      },

    )
  }
};