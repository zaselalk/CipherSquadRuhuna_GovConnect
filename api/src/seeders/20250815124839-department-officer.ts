"use strict";

import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    try {
      // Get department IDs
      const [departments] = await queryInterface.sequelize.query(
        `SELECT dep_id FROM departments ORDER BY dep_id ASC`
      );

      const departmentRows = departments as { dep_id: number }[];
      const department1Id = departmentRows[0]?.dep_id;
      const department2Id = departmentRows[1]?.dep_id;

      // Get user IDs based on email or role
      const [officers] = await queryInterface.sequelize.query(
        `SELECT id FROM users WHERE email IN ('chandana@gmail.com', 'ravindu@gmail.com', 'ashfa@gmail.com')`
      );
      const officerRows = officers as { id: number }[];
      const officer1Id = officerRows[0]?.id;
      const officer2Id = officerRows[1]?.id;
      const officer3Id = officerRows[2]?.id;

      // Insert officer records
      await queryInterface.bulkInsert("officers", [
        {
          dep_id: department1Id,
          officer_id: officer1Id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: department1Id,
          officer_id: officer2Id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: department2Id,
          officer_id: officer3Id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Officer seed failed:", error);
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("officers", {});
  },
};
