'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.createTable('household_residents', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        residentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'residents',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        householdId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'households',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        relation: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
    } catch (error) {
      console.log('Migration error:', error);
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.dropTable('household_residents');
    } catch (error) {
      console.log('Rollback error:', error);
    }
  }
};
