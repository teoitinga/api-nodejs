'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'Treatments',
        'partner_id',
        {
          type: Sequelize.STRING(250),
          allowNull: true,
        },
      ),
      await queryInterface.addColumn(
        'Treatments',
        'division_id',
        {
          type: Sequelize.STRING(250),
          allowNull: true,
        },
      )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Treatments', 'partner_id'),
    await queryInterface.removeColumn('Treatments', 'division_id')
  }
};