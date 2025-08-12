'use strict';
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(QueryInterface: QueryInterface) {
    try {
      await QueryInterface.createTable('residents', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        firstName: {
          allowNull: false,
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING
        },
        email: {
          unique: true,
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        },
        birthday: {

          type: DataTypes.DATE
        },
        bloodGroup: {

          type: DataTypes.STRING
        },
        sex: {
          allowNull: false,
          type: DataTypes.STRING
        },
        clinicNumber: {
          type: DataTypes.STRING
        },
        bloodPressure: {

          type: DataTypes.STRING
        },
        glucose: {
          type: DataTypes.STRING
        },
        heartRate: {
          type: DataTypes.STRING
        },
        cholesterol: {
          type: DataTypes.STRING
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        }
      });

    } catch (e) {
      console.log(e);
    }
  },
  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.dropTable('residents');
    }
    catch (e) {
      console.log(e);
    }
  }
};
