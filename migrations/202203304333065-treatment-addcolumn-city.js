'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'Treatments',
        'city',
        {
          type: Sequelize.STRING(250),
          allowNull: true,
        },
      )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Treatments', 'city')
  }
};