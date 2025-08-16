"use strict";

import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    try {
      // Get first 3 citizens
      const [citizens] = await queryInterface.sequelize.query(
        `SELECT id FROM citizens ORDER BY id ASC LIMIT 3`
      );
      const citizenRows = citizens as { id: number }[];

      // Get first 3 services from department_services
      const [services] = await queryInterface.sequelize.query(
        `SELECT service_id AS id FROM department_services ORDER BY service_id ASC LIMIT 3`
      );
      const serviceRows = services as { id: number }[];

      // Prepare appointment data
      const appointmentsData = citizenRows.map((citizen, index) => ({
        citizenId: citizen.id,
        serviceId: serviceRows[index % serviceRows.length].id,
        appointmentDate: "2025-09-0" + (index + 2),
        appointmentTime: "11:0" + index,
        referenceId: `REF-2025-000${index + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Insert appointments
      await queryInterface.bulkInsert("appointments", appointmentsData);
    } catch (error) {
      console.error("Appointment seeder failed:", error);
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("appointments", {});
  },
};
