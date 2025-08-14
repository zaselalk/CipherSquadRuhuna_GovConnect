"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      const departments = [
        {
          dep_id: 1,
          name: "Department of Motor Traffic",
          link: "https://www.motortraffic.gov.lk",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          dep_id: 2,
          name: "Department for Registration of Persons",
          link: "https://drp.gov.lk/",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          dep_id: 3,
          name: "Department of Immigration and Emigration",
          link: "https://www.immigration.gov.lk/",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          dep_id: 4,
          name: "Department of Health Services",
          link: "https://www.health.gov.lk/",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          dep_id: 5,
          name: "Inland Revenue Department",
          link: "https://www.ird.gov.lk/SitePages/Default.aspx",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      await queryInterface.bulkInsert("departments", departments);
    } catch (error) {
      console.error("Error inserting departments:", error);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkDelete("departments", {
        name: [
          "Department of Motor Traffic",
          "Department for Registration of Persons",
          "Department of Immigration and Emigration",
          "Department of Health Services",
          "Inland Revenue Department",
        ],
      });
    } catch (error) {
      console.error("Error deleting departments:", error);
      throw error;
    }
  },
};
