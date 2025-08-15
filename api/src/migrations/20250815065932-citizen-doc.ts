"use strict";

import { DataTypes, QueryInterface, Sequelize } from "sequelize";

/**
 * Migration to create the citizen_docs table.
 * This table stores documents uploaded by citizens and links them to their types.
 */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("citizen_docs", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        citizen_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "citizens",
              key: "id", // was incorrectly 'citizen_id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          document_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: "document_types",
              key: "doc_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        file_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        file_path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        mime_type: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        uploadedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
      throw new Error("Error creating citizen_docs table: " + error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.dropTable("citizen_docs");
    } catch (error) {
      console.error(error);
      throw new Error("Error dropping citizen_docs table: " + error);
    }
  },
};
