"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkInsert("users", [
        {
          name: "Chandana Bandara",
          email: "chandana@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu", // hashed password for 'cha@123'
          role: "Administrator",
          phone_number: "0771234567",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ravindu Perera",
          email: "ravindu@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu", // hashed password for 'ravi@123'
          role: "Officer",
          phone_number: "0777654321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ashfar Nazeer",
          email: "ashfa@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu", // hashed password for 'cha@123'
          role: "Analyst",
          phone_number: "0779876543",
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
