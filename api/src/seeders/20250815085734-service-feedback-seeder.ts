'use strict';

import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert('ServiceFeedbacks', [
    {
      id: 'f1',
      appointmentId: '1',
      serviceName: 'Passport Renewal',
      userId: 'u123',
      rating: 5,
      comment: 'Very smooth process, staff were helpful!',
      type: 'positive',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'f2',
      appointmentId: '8',
      serviceName: 'Marriage Certificate Issuance',
      userId: 'u123',
      rating: 3,
      comment: 'Took longer than expected, but service was okay.',
      type: 'neutral',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete('ServiceFeedbacks', {}, {});
}
