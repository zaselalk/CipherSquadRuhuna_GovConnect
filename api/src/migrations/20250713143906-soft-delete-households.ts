"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      // Add deletedAt column
      await queryInterface.addColumn("households", "deletedAt", {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      });

      // Add index to deletedAt column (optional but recommended)
      await queryInterface.addIndex("households", ["deletedAt"]);
    } catch (error) {
      console.error("Error adding soft delete column:", error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.removeIndex("households", ["deletedAt"]);
      await queryInterface.removeColumn("households", "deletedAt");
    } catch (error) {
      console.error("Error reverting soft delete column:", error);
    }
  },
};
