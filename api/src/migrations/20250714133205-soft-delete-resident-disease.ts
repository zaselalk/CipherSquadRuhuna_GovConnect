
"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.addColumn("resident_diseases", "deletedAt", {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      });

      // Optional: Add index to deletedAt for performance
      await queryInterface.addIndex("resident_diseases", ["deletedAt"]);
    } catch (error) {
      console.error("Error adding deletedAt:", error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.removeIndex("resident_diseases", ["deletedAt"]);
      await queryInterface.removeColumn("resident_diseases", "deletedAt");
    } catch (error) {
      console.error("Error reverting deletedAt:", error);
    }
  },
};
