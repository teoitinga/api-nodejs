'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'Treatments',
        'point',
        {
          type: Sequelize.GEOMETRY('POINT'),
          allowNull: true,
        },
      )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Treatments', 'point')
  }
};