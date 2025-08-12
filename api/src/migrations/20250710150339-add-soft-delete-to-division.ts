import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.addColumn("divisions", "createdAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(), // Sequelize.literal('CURRENT_TIMESTAMP') also valid
    });

    await queryInterface.addColumn("divisions", "updatedAt", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    });

    await queryInterface.addColumn("divisions", "deletedAt", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeColumn("divisions", "createdAt");
    await queryInterface.removeColumn("divisions", "updatedAt");
    await queryInterface.removeColumn("divisions", "deletedAt");
  },
};
