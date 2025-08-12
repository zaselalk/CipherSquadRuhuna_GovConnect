"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    /**
     * Add missing createdAt and updatedAt columns to the clinic table.
     */
    await queryInterface.addColumn("clinics", "createdAt", {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: new Date(),
    });

    await queryInterface.addColumn("clinics", "updatedAt", {
      type: "TIMESTAMP",
      allowNull: false,
      defaultValue: new Date(),
    });
  },

  async down(queryInterface: QueryInterface) {
    /**
     * Remove createdAt and updatedAt columns from the clinic table.
     */
    await queryInterface.removeColumn("clinics", "createdAt");
    await queryInterface.removeColumn("clinics", "updatedAt");
  },
};
