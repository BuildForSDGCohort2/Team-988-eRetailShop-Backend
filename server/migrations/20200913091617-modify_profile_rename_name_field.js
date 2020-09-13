"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn(
        "Profiles", // table name
        "name", // new field name
        "profilename"
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
