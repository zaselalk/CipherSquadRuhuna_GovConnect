'use strict';

import{ DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    
    //add auto incerementing id field to the table
    try {
      await queryInterface.removeConstraint("households", "PRIMARY");
      await queryInterface.addColumn("households", "id", {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down (queryInterface: QueryInterface) {
    //remove auto incerementing id field to the table
    try {
      await queryInterface.removeColumn("households", "id");
    } catch (error) {
      console.log(error);
    }
    
  }
};
