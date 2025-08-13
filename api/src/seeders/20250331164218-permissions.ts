"use strict";

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "permissions",
        [
          /**
           * User related permission
           */
          {
            permission: "user:view",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "user:create",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "user:edit",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "user:delete",
            createdAt: new Date(),
            updatedAt: new Date(),
          },

          /**
           * Role related permission
           */
          {
            permission: "role:create",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "role:delete",
            createdAt: new Date(),
            updatedAt: new Date(),
          },

          /**
           * Department related permission
           */
          {
            permission: "department:create",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "department:edit",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "department:delete",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "department:view",
            createdAt: new Date(),
            updatedAt: new Date(),
          },

          /**
           * Service related permission
           */
          {
            permission: "service:create",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "service:edit",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "service:delete",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "service:view",
            createdAt: new Date(),
            updatedAt: new Date(),
          },

          /**
           * Citizen related permission
           */
          {
            permission: "citizen:create",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "citizen:edit",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "citizen:delete",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            permission: "citizen:view",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (error) {
      console.log("Error in seeding permissions: ", error);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    try {
      await queryInterface.bulkDelete("permissions", {}, {});
    } catch (error) {
      console.log("Error in deleting permissions: ", error);
    }
  },
};
