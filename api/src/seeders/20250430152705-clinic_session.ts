import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    try {
      // get the clinic IDs from the clinics table
      const clinics = await queryInterface.sequelize.query(
        `SELECT id FROM clinics;`
      );
      const clinicIds = clinics[0].map((clinic: any) => clinic.id);

      // check if clinicIds is empty
      if (clinicIds.length === 0) {
        console.error("No clinic IDs found. Cannot seed clinic sessions.");
        return;
      }

      await queryInterface.bulkInsert("clinic_sessions", [
        {
          clinicId: clinicIds[0],
          name: "Morning Checkup",
          sessionDate: "2025-05-01",
        },
        {
          clinicId: clinicIds[0],
          name: "Evening Consultation",
          sessionDate: "2025-05-02",
        },
      ]);
    } catch (error) {
      console.error("Error seeding sessions:", error);
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("clinic_sessions", {}, {});
  },
};
