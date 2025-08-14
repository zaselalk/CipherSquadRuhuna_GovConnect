"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/**
 * Migration to create the document_types table.
 * This table stores types of documents like Passport, NIC, etc.
 */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("document_types", {
        doc_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
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
      throw new Error("Error creating document_types table: " + error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.dropTable("document_types");
    } catch (error) {
      console.error(error);
      throw new Error("Error dropping document_types table: " + error);
    }
  },
};
