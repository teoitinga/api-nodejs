'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'Comments',
        'readed',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'readed')
  }
};