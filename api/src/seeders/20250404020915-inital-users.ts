"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      // find the roleId of the role with name 'Administrator'
      const [results, metadata] = (await queryInterface.sequelize.query(
        `SELECT id FROM roles WHERE role = 'Administrator'`
      )) as [Array<{ id: number }>, any];
      const roleId = results[0].id;

      // find the roleId of the role with name 'Officer'
      const [officerResults, officerMetadata] =
        (await queryInterface.sequelize.query(
          `SELECT id FROM roles WHERE role = 'Officer'`
        )) as [Array<{ id: number }>, any];
      const officerRoleId = officerResults[0].id;

      // find the roleId of the role with name 'Citizen'
      const [citizenResults, citizenMetadata] =
        (await queryInterface.sequelize.query(
          `SELECT id FROM roles WHERE role = 'Citizen'`
        )) as [Array<{ id: number }>, any];
      const citizenRoleId = citizenResults[0].id;

      await queryInterface.bulkInsert("users", [
        {
          name: "Chandana Bandara",
          email: "chandana@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu", // hashed password for 'cha@123'
          roleId: roleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ravindu Perera",
          email: "ravindu@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu", // hashed password for 'ravi@123'
          roleId: officerRoleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ashfar Nazeer",
          email: "ashfa@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu", // hashed password for 'cha@123'
          roleId: citizenRoleId,
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
        email: ["chandana@gmail.com", "ravindu@gmail.com", "ashfa@gmail.com"],
      });
    } catch (error) {
      console.log("Failed to delete user", error);
    }
  },
};
