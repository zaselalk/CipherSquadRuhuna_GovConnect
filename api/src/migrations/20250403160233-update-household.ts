"use strict";

import sequelize, { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      // change houseid column as houseno and change datatype to STRING
      await queryInterface.renameColumn("households", "houseid", "house_no");
      await queryInterface.changeColumn("households", "house_no", {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "House No cannot be empty",
          },
        },
      });

      // drop column user id
      await queryInterface.removeColumn("households", "password");
      // drop column houseowner
      await queryInterface.removeColumn("households", "houseowner");
      // drop column familyMember
      await queryInterface.removeColumn("households", "familyMember");

      // drop column income_range
      await queryInterface.removeColumn("households", "income_range");

      // drop column location
      await queryInterface.removeColumn("households", "location");

      // add column longitude
      await queryInterface.addColumn("households", "longitude", {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Longitude cannot be empty",
          },
        },
      });

      // add column latitude
      await queryInterface.addColumn("households", "latitude", {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Latitude cannot be empty",
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      // revert houseid column to house_no and change datatype to INTEGER
      await queryInterface.renameColumn("Households", "house_no", "houseid");
      await queryInterface.changeColumn("Households", "houseid", {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "House Id cannot be empty",
          },
        },
      });

      // add column password
      await queryInterface.addColumn("Households", "password", {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
        },
      });

      // add column houseowner
      await queryInterface.addColumn("Households", "houseowner", {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be empty",
          },
        },
      });

      // add column familyMember
      await queryInterface.addColumn("Households", "familyMember", {
        type: DataTypes.INTEGER,
      });

      // add column income_range
      await queryInterface.addColumn("Households", "income_range", {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Income Range cannot be empty",
          },
        },
      });

      // add column location
      await queryInterface.addColumn("Households", "location", {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Location cannot be empty",
          },
        },
      });

      // drop column longitude
      await queryInterface.removeColumn("Households", "longitude");
      // drop column latitude
      await queryInterface.removeColumn("Households", "latitude");
    } catch (error) {
      console.log(error);
    }
  },
};
