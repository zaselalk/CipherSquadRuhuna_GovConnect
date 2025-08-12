'use strict';

import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert('resident_clinic', [
      {
        residentId: 1,
        clinicId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        residentId: 2,
        clinicId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        residentId: 3,
        clinicId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        residentId: 4,
        clinicId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('resident_clinic', {}, {});
  },
};
