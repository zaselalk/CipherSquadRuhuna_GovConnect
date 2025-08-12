"use strict";

import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable("permissions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        permission: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      // check if the "permissionrole" table exists before dropping
      const tableExists = await queryInterface.sequelize.query(
        `SELECT * FROM information_schema.tables WHERE table_name = 'permissionrole'`
      );
      if (tableExists[0].length > 0) {
        console.log("permissionroles table has data, dropping the table");
        await queryInterface.dropTable("permissionrole");
      }

      await queryInterface.dropTable("permissions");
    } catch (error) {
      console.log(error);
    }
  },
};
