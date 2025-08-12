"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.addColumn("residents", "religion", {
        type: DataTypes.STRING,
      });

      await queryInterface.addColumn("residents", "jobdetail", {
        type: DataTypes.STRING,
      });

      await queryInterface.addColumn("residents", "gluecose", {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      });

      await queryInterface.addColumn("residents", "Birthcertificate", {
        type: DataTypes.STRING,
        defaultValue: "",
      });

      await queryInterface.addColumn("residents", "deletedAt", {
        type: DataTypes.DATE,
        defaultValue: null,
      });

      // Optional index for performance on soft delete queries
      await queryInterface.addIndex("residents", ["deletedAt"]);
    } catch (error) {
      console.error("Error applying columns to residents table:", error);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.removeColumn("residents", "religion");
      await queryInterface.removeColumn("residents", "jobdetail");
      await queryInterface.removeColumn("residents", "gluecose");
      await queryInterface.removeColumn("residents", "Birthcertificate");
      await queryInterface.removeIndex("residents", ["deletedAt"]);
      await queryInterface.removeColumn("residents", "deletedAt");
    } catch (error) {
      console.error("Error reverting changes from residents table:", error);
      throw error;
    }
  },
};
