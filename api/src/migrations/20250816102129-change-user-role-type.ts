"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // remove the 'roleId' column from the 'users' table
    await queryInterface.removeColumn("users", "roleId");
    // add the 'role' column to the 'users' table
    await queryInterface.addColumn("users", "role", {
      type: "VARCHAR(255)",
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface) {
    // remove the 'role' column from the 'users' table
    await queryInterface.removeColumn("users", "role");
    // add the 'roleId' column back to the 'users' table
    await queryInterface.addColumn("users", "roleId", {
      type: "INTEGER",
      allowNull: true,
      references: {
        model: "roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
};
