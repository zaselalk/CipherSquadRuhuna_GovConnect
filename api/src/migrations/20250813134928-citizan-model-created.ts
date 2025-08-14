"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/**
 * Migration to create the citizens table.
 * This migration creates the `citizens` table to store citizen information.
 * The table includes fields for full name, email, password hash, date of birth,
 */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("citizens", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dateOfBirth: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        contactNumber: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        NICNumber: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      });
    } catch (error: unknown) {
      console.log(error);
      throw new Error("Error creating citizens table: " + error);
    }
  },
  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.dropTable("citizens");
    } catch (error) {
      console.log(error);
      throw new Error("Error dropping citizens table: " + error);
    }
  },
};
