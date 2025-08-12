'use strict';

import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('household_residents', [
      {
        residentId: 1,
        householdId: 1,
        relation: 'owner',
      },
      {
        residentId: 2,
        householdId: 1,
        relation: 'Mother',
      },
      {
        residentId: 3,
        householdId: 1,
        relation: 'Daughter',
      },
      {
        residentId: 4,
        householdId: 1,
        relation: 'father',
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('household_residents', [
      { residentId: 1, householdId: 1 },
      { residentId: 2, householdId: 1 },
      { residentId: 3, householdId: 1 },
      { residentId: 4, householdId: 1 },
     
    ]);
  },
};
