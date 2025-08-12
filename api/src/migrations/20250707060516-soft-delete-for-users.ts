"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("users", "deletedAt", {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    });

    // Adding an index to the deletedAt column for performance
    await queryInterface.addIndex("users", ["deletedAt"]);
  },

  async down(queryInterface: QueryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex("users", ["deletedAt"]);
    await queryInterface.removeColumn("users", "deletedAt");
  },
};
