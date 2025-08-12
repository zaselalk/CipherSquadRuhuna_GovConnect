"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("clinics", "deletedAt", {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    });

    // Add index on deletedAt for performance on soft-delete queries
    await queryInterface.addIndex("clinics", ["deletedAt"]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex("clinics", ["deletedAt"]);
    await queryInterface.removeColumn("clinics", "deletedAt");
  },
};
