"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.addColumn("diseases", "deletedAt", {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      });

      // Optional: Add index to improve query performance
      await queryInterface.addIndex("diseases", ["deletedAt"]);
    } catch (error) {
      console.error("Error applying soft delete:", error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.removeIndex("diseases", ["deletedAt"]);
      await queryInterface.removeColumn("diseases", "deletedAt");
    } catch (error) {
      console.error("Error reverting soft delete:", error);
    }
  },
};
