import { QueryInterface } from "sequelize"; // Import QueryInterface from sequelize

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("diseases", [
      {
        diseaseName: "Diabetes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        diseaseName: "Hypertension",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        diseaseName: "Asthma",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        diseaseName: "Cancer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        diseaseName: "Tuberculosis",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("diseases", {
      diseaseName: [
        "Diabetes",
        "Hypertension",
        "Asthma",
        "Cancer",
        "Tuberculosis",
      ],
    });
  },
};
