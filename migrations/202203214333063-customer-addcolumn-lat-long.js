'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'Customers',
        'latitude',
        {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
      ),
      await queryInterface.addColumn(
        'Customers',
        'longitude',
        {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
      )

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Customers', 'latitude'),
    await queryInterface.removeColumn('Customers', 'longitude')
  }
};