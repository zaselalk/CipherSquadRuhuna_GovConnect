import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkInsert("clinics", [
        { name: "Medical" },
        { name: "Dental" },
        { name: "NCD" },
        { name: "Mental health" },
        { name: "Anitinatal" },
        { name: "Postranatal" },
        { name: "Family Planning" },
        { name: "Well Women" },
        { name: "Mituru Piyasa" },
        { name: "Youn Piyasa" },
        { name: "Nutrition" },
        { name: "Exercise Clinic" },
        { name: "Counselling clinic" },
      ]);
    } catch (error) {
      console.error("Error seeding clinics:", error);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("clinics", {}, {});
  },
};
