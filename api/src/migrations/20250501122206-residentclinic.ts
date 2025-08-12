import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.createTable('resident_clinic', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        residentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        clinicId: {
          type: DataTypes.INTEGER,
          allowNull: false,

        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      });
    } catch (error) {
      console.error('Error creating ResidentClinic table:', error);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.dropTable('resident_clinic');
    } catch (error) {
      console.error('Error dropping ResidentClinic table:', error);
      throw error;
    }
  },
};
