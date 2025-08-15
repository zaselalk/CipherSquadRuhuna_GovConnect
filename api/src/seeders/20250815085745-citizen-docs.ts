"use strict";

import { QueryInterface } from "sequelize";

interface SeedDocument {
  citizen_id: number;
  document_id: number;
  file_name: string;
  file_path: string;
  mime_type: string | null;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default {
  async up(queryInterface: QueryInterface) {
    try {
      // Example documents to seed
      const documents: SeedDocument[] = [
        {
          citizen_id: 1,
          document_id: 1,
          file_name: "passport.pdf",
          file_path: "uploads/documents/passport.pdf",
          mime_type: "application/pdf",
          uploadedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          citizen_id: 2,
          document_id: 2,
          file_name: "birth_certificate.pdf",
          file_path: "uploads/documents/birth_certificate.pdf",
          mime_type: "application/pdf",
          uploadedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          citizen_id: 1,
          document_id: 3,
          file_name: "driver_license.jpg",
          file_path: "uploads/documents/driver_license.jpg",
          mime_type: "image/jpeg",
          uploadedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Filter documents to ensure FK references exist
      const existingCitizens = await queryInterface.sequelize.query(
        `SELECT id FROM citizens WHERE id IN (1,2)`
      );
      const existingDocs = await queryInterface.sequelize.query(
        `SELECT doc_id FROM document_types WHERE doc_id IN (1,2,3)`
      );

      const validCitizenIds = (existingCitizens[0] as any[]).map(c => c.id);
      const validDocIds = (existingDocs[0] as any[]).map(d => d.doc_id);

      const filteredDocs = documents.filter(
        d => validCitizenIds.includes(d.citizen_id) && validDocIds.includes(d.document_id)
      );

      if (filteredDocs.length === 0) {
        console.warn("No valid documents to seed. Check your citizen/document_type IDs.");
        return;
      }

      await queryInterface.bulkInsert("citizen_docs", filteredDocs, {});
      console.log(`Seeded ${filteredDocs.length} citizen_docs successfully.`);
    } catch (error) {
      console.error("Error seeding citizen_docs:", error);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkDelete("citizen_docs", {}, {});
      console.log("Removed seeded citizen_docs successfully.");
    } catch (error) {
      console.error("Error removing seeded citizen_docs:", error);
      throw error;
    }
  },
};
