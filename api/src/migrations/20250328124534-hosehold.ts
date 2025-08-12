"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("households", {
        houseid: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        houseowner: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        familyMember: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        grama_division: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        income_range: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
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
      await queryInterface.dropTable("households");
    } catch (error) {
      console.log(error);
    }
  },
};
