"use strict";

import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    try {
      // Get last 3 appointments
      const [appointments] = await queryInterface.sequelize.query(
        `SELECT referenceId, citizenId FROM appointments ORDER BY createdAt DESC LIMIT 3`
      );
      const appointmentRows = appointments as { referenceId: string; citizenId: number }[];

      // Prepare documents data (2 per appointment)
      const documentsData = appointmentRows.flatMap((appt, index) => [
        {
          citizen_id: appt.citizenId,
          document_id: 1,
          file_name: `passport_scan_${index + 1}.pdf`,
          file_path: `/uploads/citizens/${appt.citizenId}/passport_scan_${index + 1}.pdf`,
          mime_type: "application/pdf",
          appointmentReferenceId: appt.referenceId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          citizen_id: appt.citizenId,
          document_id: 4,
          file_name: `nic_copy_${index + 1}.jpg`,
          file_path: `/uploads/citizens/${appt.citizenId}/nic_copy_${index + 1}.jpg`,
          mime_type: "image/jpeg",
          appointmentReferenceId: appt.referenceId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      // Insert documents
      await queryInterface.bulkInsert("appointment_documents", documentsData);
    } catch (error) {
      console.error("Appointment document seeder failed:", error);
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("appointment_documents", {});
  },
};
