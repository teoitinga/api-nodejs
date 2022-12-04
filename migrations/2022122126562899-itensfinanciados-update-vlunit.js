'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface .changeColumn('itensfinanciados', 'valorunit', {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.queryInterface.changeColumn('itensfinanciados', 'valorunit')
  }
};