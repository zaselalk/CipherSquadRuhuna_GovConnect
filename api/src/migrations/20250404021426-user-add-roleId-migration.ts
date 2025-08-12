"use strict";

import { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // add roleId to users table
    try {
      await queryInterface.addColumn("users", "roleId", {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface) {
    // remove roleId from users table
    try {
      await queryInterface.removeColumn("users", "roleId");
    } catch (error) {
      console.log(error);
    }
  },
};
