"use strict";
/** @type {import('sequelize-cli').Migration} */

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("roles", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
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
      await queryInterface.dropTable("roles");
    } catch (error) {
      console.log(error);
    }
  },
};
