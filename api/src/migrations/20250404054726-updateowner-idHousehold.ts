"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // add owner_id column referencing resident table
    try {
      await queryInterface.addColumn("households", "owner_id", {
        type: DataTypes.INTEGER,
        allowNull: false,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.removeColumn("households", "owner_id");
    } catch (error) {
      console.log(error);
    }
  },
};
