"use strict";

import { QueryInterface } from "sequelize";

/**
 * Seeder to add a new role: super_admin with all permissions.
 */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("roles", [
      {
        role: "super_admin",
        permission: JSON.stringify([
          "user:create",
          "user:edit",
          "user:delete",
          "user:view",
          "role:create",
          "role:edit",
          "role:delete",
          "role:view",
          "clinic:create",
          "clinic:edit",
          "clinic:delete",
          "clinic:view",
          "disease:create",
          "disease:edit",
          "disease:delete",
          "disease:view",
          "division:create",
          "division:edit",
          "division:delete",
          "division:view",
          "household:create",
          "household:edit",
          "household:delete",
          "household:view",
          "resident:create",
          "resident:edit",
          "resident:delete",
          "resident:view",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("roles", { role: "super_admin" });
  },
};
