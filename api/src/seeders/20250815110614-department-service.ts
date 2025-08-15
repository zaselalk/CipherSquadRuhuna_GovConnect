'use strict';

import { QueryInterface } from "sequelize";


module.exports = {
  async up (queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkInsert("department_services", [
        {
          dep_id: 1,
          name: "Network Support",
          description: "Maintains internal network and connectivity",
          doc_id: JSON.stringify([1, 2]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 1,
          name: "Software Deployment",
          description: "Deploys new software for employees",
          doc_id: JSON.stringify([3]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 2,
          name: "Recruitment",
          description: "Manages hiring and onboarding",
          doc_id: JSON.stringify([4]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 2,
          name: "Employee Training",
          description: "Organizes employee skill development programs",
          doc_id: JSON.stringify([5]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 3,
          name: "Payroll Management",
          description: "Handles salaries, deductions, and taxes",
          doc_id: JSON.stringify([6]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error: unknown) {
      console.error("Seeding department_services failed:", error);
      throw error;
    }
  },

  async down (queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkDelete("department_services", {}, {});
    } catch (error) {
      console.error("Removing seeded department_services failed:", error);
      throw error;
    }
  }
};

