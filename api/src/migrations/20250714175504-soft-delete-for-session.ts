'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('clinic_sessions', 'deletedAt', {
      type: DataTypes.DATE,
      allowNull: true,
    });

    // Optional: If you haven't added timestamps before
    await queryInterface.addColumn('clinic_sessions', 'createdAt', {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    });

    await queryInterface.addColumn('clinic_sessions', 'updatedAt', {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('clinic_sessions', 'deletedAt');
    await queryInterface.removeColumn('clinic_sessions', 'createdAt');
    await queryInterface.removeColumn('clinic_sessions', 'updatedAt');
  },
};
