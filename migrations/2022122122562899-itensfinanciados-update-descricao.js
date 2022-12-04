'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface .changeColumn('itensfinanciados', 'descricao', {
      type: Sequelize.STRING(250),
      allowNull: false
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.queryInterface.changeColumn('itensfinanciados', 'descricao')
  }
};