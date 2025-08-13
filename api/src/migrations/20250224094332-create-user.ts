"use strict";

import { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("users", {
        id: {
          type: DataType.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataType.STRING,
          allowNull: false,
          validate: {
            notEmpty: { msg: "Name cannot be empty" },
          },
        },
        email: {
          type: DataType.STRING,
          allowNull: false,
          unique: true,
        },
        phone_number: {
          type: DataType.STRING,
          allowNull: false,
        },
        password: {
          type: DataType.STRING,
          allowNull: false,
          validate: {
            notEmpty: { msg: "Password cannot be empty" },
          },
        },
        roleId: {
          type: DataType.INTEGER,
          allowNull: false,
          references: {
            model: "roles",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
        createdAt: {
          allowNull: false,
          type: DataType.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataType.DATE,
        },
        deletedAt: {
          type: DataType.DATE,
          allowNull: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.dropTable("users");
    } catch (error) {
      console.log(error);
    }
  },
};
