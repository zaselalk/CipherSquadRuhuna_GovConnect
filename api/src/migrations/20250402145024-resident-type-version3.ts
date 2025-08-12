'use strict';
import sequelize, { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    try {
      // await queryInterface.removeColumn("residents", "height");
      // await queryInterface.removeColumn("residents", "weight");
      // await queryInterface.addColumn("residents", "height", {
      //   type: DataType.NUMBER,
      //   allowNull: true,
      //   defaultValue: null
      // });
      // await queryInterface.addColumn("residents", "weight", {
      //   type: DataType.NUMBER,
      //   allowNull: true,
      //   defaultValue: null
      // });
    } catch (e) {
      console.log(e);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    try {
      // await queryInterface.removeColumn("residents", "height");
      // await queryInterface.removeColumn("residents", "weight");

      // await queryInterface.addColumn("residents", "height", {
      //   type: DataType.NUMBER,
      //   allowNull: true,
      //   defaultValue: null
      // });
      // await queryInterface.addColumn("residents", "weight", {
      //   type: DataType.NUMBER,
      //   allowNull: true,
      //   defaultValue: null
      // });
    } catch (e) {
      console.log(e);
    }
  }
};
