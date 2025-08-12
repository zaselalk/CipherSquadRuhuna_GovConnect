"use strict";

import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkInsert("resident_diseases", [
        {
          residentId: 1,
          diseaseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Kasun - Diabetes
        {
          residentId: 2,
          diseaseId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Nimal - Hypertension
        {
          residentId: 3,
          diseaseId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Tharindu - Asthma
        {
          residentId: 4,
          diseaseId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Sajini - Cancer
        {
          residentId: 5,
          diseaseId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Dilan - Hypertension
        {
          residentId: 6,
          diseaseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Harshini - Diabetes
        {
          residentId: 7,
          diseaseId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Ruwan - Diabetes
        {
          residentId: 8,
          diseaseId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Iresha - Tuberculosis
        {
          residentId: 9,
          diseaseId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Amal - Asthma
        {
          residentId: 10,
          diseaseId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, // Chamari - Cancer
      ]);
    } catch (error) {
      console.error("Error seeding resident_diseases:", error);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    try {
      await queryInterface.bulkDelete("resident_diseases", {
        residentId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });
    } catch (error) {
      console.error("Error deleting resident_diseases:", error);
    }
  },
};
