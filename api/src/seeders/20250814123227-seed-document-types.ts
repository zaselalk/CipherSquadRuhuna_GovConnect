"use strict";

import { QueryInterface } from "sequelize";

/**
 * Seeder to populate document_types table with default document types and short descriptions
 */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkInsert("document_types", [
        { name: "National Identity Card (NIC)", description: "Official government ID card", createdAt: new Date(), updatedAt: new Date() },
        { name: "Passport", description: "International travel document", createdAt: new Date(), updatedAt: new Date() },
        { name: "Driving License", description: "Legal permit to drive vehicles", createdAt: new Date(), updatedAt: new Date() },
        { name: "Birth Certificate", description: "Proof of birth and identity", createdAt: new Date(), updatedAt: new Date() },
        { name: "Marriage Certificate", description: "Official proof of marriage", createdAt: new Date(), updatedAt: new Date() },
        { name: "Death Certificate", description: "Official proof of death", createdAt: new Date(), updatedAt: new Date() },
        { name: "School Leaving Certificate (OL/AL)", description: "Proof of school completion", createdAt: new Date(), updatedAt: new Date() },
        { name: "Degree/Diploma Certificates", description: "Higher education qualification certificates", createdAt: new Date(), updatedAt: new Date() },
        { name: "Academic Transcripts / Mark Sheets", description: "Detailed exam results", createdAt: new Date(), updatedAt: new Date() },
        { name: "Land Deeds / Title Documents", description: "Proof of land ownership", createdAt: new Date(), updatedAt: new Date() },
        { name: "Court Orders / Affidavits", description: "Legal court documents", createdAt: new Date(), updatedAt: new Date() },
        { name: "Medical Certificates", description: "Health or medical proof", createdAt: new Date(), updatedAt: new Date() },
        { name: "Vaccination Records", description: "Proof of vaccinations", createdAt: new Date(), updatedAt: new Date() },
        { name: "Tax Clearance Certificate", description: "Proof of tax compliance", createdAt: new Date(), updatedAt: new Date() },
        { name: "Police Clearance Certificate", description: "Proof of criminal record check", createdAt: new Date(), updatedAt: new Date() },
        { name: "Bank Statements", description: "Financial transaction history", createdAt: new Date(), updatedAt: new Date() },
      ]);
    } catch (error: unknown) {
      console.error("Seeding document_types failed:", error);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkDelete("document_types", {}, {});
    } catch (error) {
      console.error("Removing seeded document_types failed:", error);
      throw error;
    }
  },
};
