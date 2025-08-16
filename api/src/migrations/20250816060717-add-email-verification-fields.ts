"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("citizens", "email_verified", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn("citizens", "email_verification_token", {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.addColumn("citizens", "email_verification_expires", {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("citizens", "email_verified");
    await queryInterface.removeColumn("citizens", "email_verification_token");
    await queryInterface.removeColumn("citizens", "email_verification_expires");
  },
};
