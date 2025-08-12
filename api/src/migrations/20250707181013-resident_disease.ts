'use strict';
import { QueryInterface, Sequelize } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  async up(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.createTable('resident_diseases', {
        residentDiseaseId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataType.INTEGER,
        },
        residentId: {
          type: DataType.INTEGER,
          allowNull: false,
          references: {
            model: 'residents',
            key: 'id',
          },
        },
        diseaseId: {
          type: DataType.INTEGER,
          allowNull: false,
          references: {
            model: 'diseases',
            key: 'diseaseId',
          },
        },
        createdAt: {
          allowNull: false,
          type: DataType.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataType.DATE,
        },
      });
    } catch (error) {
      console.error('Error creating resident_diseases table:', error);
    }
  },

  async down(queryInterface: QueryInterface, sequelize: typeof Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try {
      await queryInterface.dropTable('resident_diseases');
    } catch (error) {
      console.error('Error dropping resident_diseases table:', error);
    }
  }
};
