import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('appointments', {
      appointmentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      citizenId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      appointmentTime: {
        type: DataTypes.TIME,
        allowNull: false
      },
      referenceId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('appointments');
  }
};
