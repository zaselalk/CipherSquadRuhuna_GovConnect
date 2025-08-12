import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.renameColumn("residents", "sex", "gender");
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.renameColumn("residents", "gender", "sex");
  },
};
