"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.addColumn("department_services", "doc_id", {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: true,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error creating service_models table: " + error);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeColumn("department_services", "doc_id");
  },
};

