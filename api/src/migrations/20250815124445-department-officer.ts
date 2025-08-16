import { DataTypes, QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("officers", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dep_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments", // Assuming the departments table is where department IDs are stored
          key: "dep_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      officer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Assuming the users table is where officer IDs are stored
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("officers");
  },
};
