"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("roles", [
      {
        role: "Administrator",
        permission: JSON.stringify([
          "user:create",
          "user:edit",
          "user:delete",
          "user:view",
          "citizen:create",
          "citizen:edit",
          "citizen:delete",
          "citizen:view",
          "role:create",
          "role:edit",
          "role:delete",
          "role:view",
          "department:create",
          "department:edit",
          "department:delete",
          "department:view",
          "service:create",
          "service:edit",
          "service:delete",
          "service:view",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "Officer",
        permission: JSON.stringify([
          "user:create",
          "user:edit",
          "user:delete",
          "user:view",
          "citizen:create",
          "citizen:edit",
          "citizen:delete",
          "citizen:view",
          "role:create",
          "role:edit",
          "role:delete",
          "role:view",
          "department:edit",
          "department:view",
          "service:create",
          "service:edit",
          "service:delete",
          "service:view",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "Citizen",
        permission: JSON.stringify(["department:view", "service:view"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("roles", {
      role: ["Administrator", "Officer", "Citizen"],
    });
  },
};
