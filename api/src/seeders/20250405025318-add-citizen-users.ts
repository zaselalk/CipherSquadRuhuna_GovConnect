"use strict";

import { QueryInterface, where } from "sequelize";
import Role from "../models/role";
import { UserAttributes } from "../models/user";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      const role = await Role.findOne({
        attributes: ["id"],
        where: {
          role: "Citizen",
        },
      });
      if (!role) {
        throw new Error("Role 'Citizen' not found");
      }
      const users: UserAttributes[] = [
        {
          name: "Nimasha Jayasinghe",
          email: "nish45@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ravindu Madushanka",
          email: "ravilk@gmail.com",
          password:
            "$2b$1roleId$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kamal Perera",
          email: "kamal@outlook.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dilukshi Nagasingha",
          email: "dilu@msn.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Paba Hathurusinghe",
          email: "pabahathu56@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chamika Fernando",
          email: "chamii@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sonali Gunasekara",
          email: "sonali@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Malith Gamage",
          email: "malithrs@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hiruni Ranasinghe",
          email: "hiruniran@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pasindu Jayalath",
          email: "jayapasi@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nadi Marasingha",
          email: "nadimara@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gayani Dissanayake",
          email: "gayagee@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Niroshan De Alwis",
          email: "nirosh@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kavindya Senanayake",
          email: "kavii@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Athula Adikari",
          email: "athula@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gihan Perera",
          email: "pgihan@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Menura Perera",
          email: "menumal45@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chamini Lakshani",
          email: "luckchami@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Manisha Kumari",
          email: "mahii@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mithun Rathnakaya",
          email: "myth45@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Malshi Pabasara",
          email: "malpabi56@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shanuka Jayasuriya",
          email: "shajay2001@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pasindu Jayalath",
          email: "pasijaya34@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Niramlal Jayasuriya",
          email: "nirjaya69@gmail.com",
          password:
            "$2b$10$IP4lW4HjfT6BYhUCvnpRkOECkYs8CSzbMVbnJ3LwIV6FAqbTzyUAu",
          roleId: role.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert("users", users);
    } catch (error) {}
  },

  async down(queryInterface: QueryInterface) {
    // remove all newly added users

    try {
      await queryInterface.bulkDelete("users", {
        email: [
          "nish45@gmail.com",
          "ravilk@gmail.com",
          "kamal@outlook.com",
          "dilu@msn.com",
          "pabahathu56@gmail.com",
          "chamii@gmail.com",
          "sonali@gmail.com",
          "malithrs@gmail.com",
          "hiruniran@gmail.com",
          "jayapasi@gmail.com",
          "nadimara@gmail.com",
          "gayagee@gmail.com",
          "nirosh@gmail.com",
          "kavii@gmail.com",
          "athula@gmail.com",
          "pgihan@gmail.com",
          "menumal45@gmail.com",
          "luckchami@gmail.com",
          "mahii@gmail.com",
          "myth45@gmail.com",
          "malpabi56@gmail.com",
          "shajay2001@gmail.com",
          "pasijaya34@gmail.com",
          "nirjaya69@gmail.com",
        ],
      });
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  },
};
