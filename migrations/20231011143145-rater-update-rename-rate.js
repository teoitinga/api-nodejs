'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
      return queryInterface.renameColumn('r_aters', 'rate', 'rate_1');
  },

  down: function(queryInterface, Sequelize) {
      return queryInterface.renameColumn('r_aters', 'rate_1', 'rate');
  }
};
 