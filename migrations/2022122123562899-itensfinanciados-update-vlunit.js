'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface .changeColumn('itensfinanciados', 'descricao', {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.queryInterface.changeColumn('itensfinanciados', 'descricao')
  }
};