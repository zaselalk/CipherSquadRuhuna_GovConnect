'use strict';
import sequelize, { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    try {
      await queryInterface.addColumn('residents', 'nic', {
        type: DataType.STRING,
      });
    } catch (e) {
      console.log(e);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    try {
      await queryInterface.removeColumn('residents', 'nic');
    } catch (e) {
      console.log(e);
    }

  }
};
