'use strict';

import sequelize, { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    try {
      await queryInterface.removeColumn('residents', 'cholesterol');
      await queryInterface.addColumn('residents', 'address', {
        type: DataType.STRING,
      });
      await queryInterface.addColumn('residents', 'contactNumber', {
        type: DataType.STRING,
      });
      await queryInterface.addColumn('residents', 'divisionId', {
        type: DataType.INTEGER,
      });
      await queryInterface.addColumn('residents', 'maritalState', {
        type: DataType.STRING,
      });
      await queryInterface.addColumn('residents', 'educationLevel', {
        type: DataType.STRING,
      });
      await queryInterface.addColumn('residents', 'addicted', {
        type: DataType.JSON,
        allowNull: true,
      });
      await queryInterface.addColumn('residents', 'alergies', {
        type: DataType.JSON,
      });
      await queryInterface.addColumn('residents', 'chronicalDesease', {
        type: DataType.JSON,
      });

      // await queryInterface.changeColumn('residents', 'height', {
      //   type: Sequelize.FLOAT, // or Sequelize.INTEGER
      //   allowNull: true,
      // });

      await queryInterface.addColumn('residents', 'height', { type: Sequelize.FLOAT });
      await queryInterface.addColumn('residents', 'weight', { type: Sequelize.FLOAT });

    } catch (e) {
      console.log(e);
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof sequelize) {
    try {
      await queryInterface.removeColumn('residents', 'address');
      await queryInterface.removeColumn('residents', 'contactNumber');
      await queryInterface.removeColumn('residents', 'divisionId');
      await queryInterface.removeColumn('residents', 'maritalState');
      await queryInterface.removeColumn('residents', 'educationLevel');
      await queryInterface.removeColumn('residents', 'addicted');
      await queryInterface.removeColumn('residents', 'alergies');
      await queryInterface.removeColumn('residents', 'chronicalDesease');
      // await queryInterface.removeColumn('residents', 'height');
      // await queryInterface.removeColumn('residents', 'weight');
    } catch (e) {
      console.log(e);
    }

  }
};
