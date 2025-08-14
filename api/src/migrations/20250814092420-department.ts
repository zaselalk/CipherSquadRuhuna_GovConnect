"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/**
 * Migration to create the departments table.
 * This table stores department information.
 */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("departments", {
        dep_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        link: {
          type: DataTypes.STRING,
          allowNull: true,
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
      console.error(error);
      throw new Error("Error creating departments table: " + error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.dropTable("departments");
    } catch (error) {
      console.error(error);
      throw new Error("Error dropping departments table: " + error);
    }
  },
};
