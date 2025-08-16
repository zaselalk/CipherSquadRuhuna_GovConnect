"use strict";

import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkInsert("department_services", [
        // Department of Motor Traffic
        {
          dep_id: 1,
          name: "Driving License Issuance",
          description:
            "Allows citizens to apply for a new driving license or renew an existing one. Applicants must submit the required documents, complete a medical examination, and, in the case of a new license, successfully pass both theoretical and practical driving tests conducted by the Department of Motor Traffic.",
          doc_id: JSON.stringify([1, 2, 3]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 1,
          name: "Vehicle Registration",
          description:
            "Facilitates the registration of newly purchased, imported, or previously unregistered vehicles. This process includes assigning a registration number, verifying ownership documents, and issuing the official Certificate of Registration (CR) required for legal road use in Sri Lanka.",
          doc_id: JSON.stringify([4, 5]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 1,
          name: "Vehicle Transfer of Ownership",
          description:
            "Processes the legal transfer of vehicle ownership from the seller to the buyer. This includes verifying all ownership documents, checking for any unpaid fines or violations, and updating the Certificate of Registration with the new owner’s details.",
          doc_id: JSON.stringify([6, 7]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Department for Registration of Persons
        {
          dep_id: 2,
          name: "National Identity Card Issuance",
          description:
            "Enables citizens to obtain a new National Identity Card (NIC) upon reaching the legal age or replace a lost or damaged NIC. The service ensures proper verification of identity, personal details, and biometric information in accordance with national regulations.",
          doc_id: JSON.stringify([8, 9]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 2,
          name: "NIC Data Update",
          description:
            "Allows NIC holders to update or correct their personal details, including name changes after marriage, changes of address, or correction of clerical errors, ensuring that NIC records remain accurate and up-to-date.",
          doc_id: JSON.stringify([10]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Department of Immigration and Emigration
        {
          dep_id: 3,
          name: "Passport Issuance",
          description:
            "Provides Sri Lankan citizens with a valid passport for international travel. Applicants may request a new passport or renew an existing one by submitting required identification documents, biometric data, and paying the applicable processing fees.",
          doc_id: JSON.stringify([11, 12, 13]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 3,
          name: "Visa Services",
          description:
            "Processes applications for visa issuance, renewal, or extension for foreign nationals visiting Sri Lanka. This service includes tourist, business, resident, and student visas, ensuring compliance with immigration regulations.",
          doc_id: JSON.stringify([14, 15]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 3,
          name: "Citizenship Services",
          description:
            "Handles applications for dual citizenship, naturalization, and other citizenship-related matters. This includes verifying eligibility, reviewing supporting documents, and issuing official citizenship certificates when approved.",
          doc_id: JSON.stringify([16, 17]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Department of Health Services
        {
          dep_id: 4,
          name: "Medical Examination Appointments",
          description:
            "Enables individuals to schedule appointments for medical examinations conducted by government health boards. This service is often required for employment purposes, driving license issuance, or overseas travel and immigration applications.",
          doc_id: JSON.stringify([18]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 4,
          name: "Public Health License Application",
          description:
            "Allows businesses and individuals to apply for licenses related to public health activities, such as operating a food establishment, running a healthcare facility, or engaging in activities that require public health clearance.",
          doc_id: JSON.stringify([19, 20]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Inland Revenue Department
        {
          dep_id: 5,
          name: "Taxpayer Registration",
          description:
            "Facilitates the registration of individuals and companies as taxpayers in Sri Lanka. Upon registration, a Taxpayer Identification Number (TIN) is issued, which is required for filing taxes and other financial transactions with the Inland Revenue Department.",
          doc_id: JSON.stringify([21, 22]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 5,
          name: "Income Tax Filing",
          description:
            "Allows registered taxpayers to file their annual income tax returns online or in person. This includes declaring income, calculating owed taxes, claiming deductions, and paying outstanding amounts before the deadline.",
          doc_id: JSON.stringify([23]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dep_id: 5,
          name: "Tax Clearance Certificate",
          description:
            "Issues an official tax clearance certificate confirming that an individual or business has no outstanding tax liabilities. This document is often required for business tenders, government contracts, and certain types of travel.",
          doc_id: JSON.stringify([24]),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error: unknown) {
      console.error("Seeding department_services failed:", error);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    try {
      await queryInterface.bulkDelete("department_services", {}, {});
    } catch (error) {
      console.error("Removing seeded department_services failed:", error);
      throw error;
    }
  },
};
