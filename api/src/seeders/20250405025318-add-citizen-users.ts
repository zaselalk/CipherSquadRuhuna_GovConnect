"use strict";

import { QueryInterface } from "sequelize";
import { CitizenAttributes } from "../types/citizen";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      const citizens: CitizenAttributes[] = [
        {
          id: 1,
          fullName: "Kamal Perera",
          email: "kamal.perera@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W", // 123
          dateOfBirth: new Date("1990-05-12"),
          address: "45 Galle Road, Colombo 03",
          contactNumber: "+94771234567",
          NICNumber: "900512345V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          fullName: "Nadeesha Fernando",
          email: "nadeesha.fernando@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1995-11-20"),
          address: "12 Main Street, Negombo",
          contactNumber: "+94767654321",
          NICNumber: "951120876V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 3,
          fullName: "Sajith Wijesinghe",
          email: "sajith.wijesinghe@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1987-02-03"),
          address: "23 Temple Road, Kandy",
          contactNumber: "+94772349876",
          NICNumber: "870203234V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 4,
          fullName: "Thilini Abeysekera",
          email: "thilini.abeysekera@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1992-07-15"),
          address: "8 Malwatta Road, Gampaha",
          contactNumber: "+94711234987",
          NICNumber: "920715678V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 5,
          fullName: "Ruwan Jayasinghe",
          email: "ruwan.jayasinghe@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1985-10-28"),
          address: "56 Peradeniya Road, Kandy",
          contactNumber: "+94773561234",
          NICNumber: "851028123V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 6,
          fullName: "Ishara Madushani",
          email: "ishara.madushani@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1998-01-14"),
          address: "102 Ananda Mawatha, Matara",
          contactNumber: "+94770098765",
          NICNumber: "980114456V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 7,
          fullName: "Gayan Silva",
          email: "gayan.silva@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1993-08-22"),
          address: "77 High Level Road, Nugegoda",
          contactNumber: "+94716784321",
          NICNumber: "930822765V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 8,
          fullName: "Chathuri De Silva",
          email: "chathuri.desilva@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1991-04-06"),
          address: "34 D S Senanayake Mawatha, Kurunegala",
          contactNumber: "+94712345678",
          NICNumber: "910406987V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 9,
          fullName: "Kasun Rathnayake",
          email: "kasun.rathnayake@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1989-03-30"),
          address: "89 Main Street, Badulla",
          contactNumber: "+94771239876",
          NICNumber: "890330543V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 10,
          fullName: "Sanduni Wickramasinghe",
          email: "sanduni.wickramasinghe@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1996-09-17"),
          address: "4 St. Sebastian Road, Moratuwa",
          contactNumber: "+94765439871",
          NICNumber: "960917234V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 11,
          fullName: "Pradeep Kumara",
          email: "pradeep.kumara@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1984-12-08"),
          address: "45 Station Road, Anuradhapura",
          contactNumber: "+94771239012",
          NICNumber: "841208345V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 12,
          fullName: "Anushka Jayawardena",
          email: "anushka.jayawardena@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1997-06-04"),
          address: "15 Palm Grove, Colombo 04",
          contactNumber: "+94773345678",
          NICNumber: "970604567V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 13,
          fullName: "Dulmini Senanayake",
          email: "dulmini.senanayake@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1994-02-18"),
          address: "67 River Side, Ratnapura",
          contactNumber: "+94769876543",
          NICNumber: "940218654V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 14,
          fullName: "Chaminda Bandara",
          email: "chaminda.bandara@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1982-11-25"),
          address: "101 Hill Street, Hatton",
          contactNumber: "+94776543210",
          NICNumber: "821125876V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 15,
          fullName: "Menaka Dissanayake",
          email: "menaka.dissanayake@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1999-08-09"),
          address: "23 Sea View Road, Matara",
          contactNumber: "+94771234589",
          NICNumber: "990809234V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 16,
          fullName: "Suresh Rajapaksha",
          email: "suresh.rajapaksha@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1988-01-01"),
          address: "12 Lake Road, Polonnaruwa",
          contactNumber: "+94760098712",
          NICNumber: "880101567V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 17,
          fullName: "Iresha Kariyawasam",
          email: "iresha.kariyawasam@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1993-05-29"),
          address: "9 Flower Garden, Galle",
          contactNumber: "+94712340987",
          NICNumber: "930529345V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 18,
          fullName: "Nimal Peris",
          email: "nimal.peris@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1986-04-14"),
          address: "5 Old Road, Hambantota",
          contactNumber: "+94777765432",
          NICNumber: "860414765V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 19,
          fullName: "Yasodha Peiris",
          email: "yasodha.peiris@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1992-12-30"),
          address: "72 Park Road, Jaffna",
          contactNumber: "+94776543289",
          NICNumber: "921230123V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 20,
          fullName: "Harsha Senarath",
          email: "harsha.senarath@example.com",
          password:
            "$2b$10$BNcS43kzblI8El1MPGOEieubdvJqZpZmkHVNUsLFu7HCyNRjUf47W",
          dateOfBirth: new Date("1990-09-05"),
          address: "14 Station Road, Batticaloa",
          contactNumber: "+94761239876",
          NICNumber: "900905456V",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      await queryInterface.bulkInsert("citizens", citizens);
    } catch (error) {}
  },

  async down(queryInterface: QueryInterface) {
    // remove all newly added users

    try {
      await queryInterface.bulkDelete("citizens", {
        email: [
          "kamal.perera@example.com",
          "nadeesha.fernando@example.com",
          "sajith.wijesinghe@example.com",
          "thilini.abeysekera@example.com",
          "ruwan.jayasinghe@example.com",
          "ishara.madushani@example.com",
          "gayan.silva@example.com",
          "chathuri.desilva@example.com",
          "kasun.rathnayake@example.com",
          "sanduni.wickramasinghe@example.com",
          "pradeep.kumara@example.com",
          "anushka.jayawardena@example.com",
          "dulmini.senanayake@example.com",
          "chaminda.bandara@example.com",
          "menaka.dissanayake@example.com",
          "suresh.rajapaksha@example.com",
          "iresha.kariyawasam@example.com",
          "nimal.peris@example.com",
          "yasodha.peiris@example.com",
          "harsha.senarath@example.com",
        ],
      });
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  },
};
