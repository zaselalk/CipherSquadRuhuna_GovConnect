"use strict";

import { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // create column permission
    try {
      await queryInterface.addColumn("roles", "permission", {
        type: DataType.TEXT,
        allowNull: false,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface) {
    // remove column permission
    try {
      await queryInterface.removeColumn("roles", "permission");
    } catch (error) {
      console.log(error);
    }
  },
};
