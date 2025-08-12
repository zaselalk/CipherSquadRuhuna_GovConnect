"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("user_roles", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          onDelete: "RESTRICT",
          references: {
            model: "roles",
            key: "id",
          },
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.dropTable("user_roles");
    } catch (error) {
      console.log(error);
    }
  },
};
