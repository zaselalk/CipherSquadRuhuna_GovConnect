import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkInsert("feedbacks", [
        {
          citizenId: 1,
          rating: 5,
          comment: "Excellent service, very satisfied!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          citizenId: 2,
          rating: 4,
          comment: "Good experience, but room for improvement.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          citizenId: 3,
          rating: 3,
          comment: "Average service, nothing special.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          citizenId: 1,
          rating: 2,
          comment: "Service was slow this time.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("feedbacks", {}, {});
  },
};
