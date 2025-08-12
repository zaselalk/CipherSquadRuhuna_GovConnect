"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.createTable("clinic_attendances", {
        clinicId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "clinics",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        sessionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "clinic_sessions",
            key: "sessionId", // Correct PK column name for sessions
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        patientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "residents",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        attendance: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      });
    } catch (error) {
      console.error("Error creating clinic_attendances table:", error);
      throw error;
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("clinic_attendances");
  },
};
