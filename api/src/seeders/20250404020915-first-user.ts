"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      // find the roleId of the role with name 'Doctor'
      const [results, metadata] = (await queryInterface.sequelize.query(
        `SELECT id FROM roles WHERE role = 'Doctor'`
      )) as [Array<{ id: number }>, any];
      const roleId = results[0].id;
      await queryInterface.bulkInsert("users", [
        {
          name: "Chandana",
          email: "chandana@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: roleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log("Failed to insert user", error);
    }
  },

  async down(queryInterface: QueryInterface) {
    // remove the first user
    try {
      await queryInterface.bulkDelete("users", {
        email: "chandana@gmail.com",
      });
    } catch (error) {
      console.log("Failed to delete user", error);
    }
  },
};
