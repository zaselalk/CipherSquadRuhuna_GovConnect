"use strict";

import { QueryInterface, Sequelize } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
    // find the roleId of the role with name 'super_user'
    try {
      const [results] = (await queryInterface.sequelize.query(
        `SELECT id FROM roles WHERE role = 'super_admin'`
      )) as any[];
      const superUserRoleId = results && results[0] && results[0].id;

      // Ensure the super_user role exists
      if (!superUserRoleId) throw new Error("super_user role not found");

      // Update the first user to have the super_user role
      await queryInterface.bulkUpdate(
        "users",
        { roleId: superUserRoleId },
        { email: "chandana@gmail.com" }
      );

      // Ensure only one user has the super_user role
      // await queryInterface.sequelize.query(`
      //   CREATE TRIGGER before_insert_user_superuser
      //   BEFORE INSERT ON users
      //   FOR EACH ROW
      //   BEGIN
      //     IF NEW.roleId = ${superUserRoleId} THEN
      //       IF (SELECT COUNT(*) FROM users WHERE roleId = ${superUserRoleId}) > 0 THEN
      //         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one user can have the super_user role.';
      //       END IF;
      //     END IF;
      //   END;
      // `);
      // await queryInterface.sequelize.query(`
      //   CREATE TRIGGER before_update_user_superuser
      //   BEFORE UPDATE ON users
      //   FOR EACH ROW
      //   BEGIN
      //     IF NEW.roleId = ${superUserRoleId} THEN
      //       IF (SELECT COUNT(*) FROM users WHERE roleId = ${superUserRoleId}) > 0 THEN
      //         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one user can have the super_user role.';
      //       END IF;
      //     END IF;
      //   END;
      // `);

      console.log("Super user account updated successfully.");
    } catch (error) {
      console.error("Error updating super user account:", error);
      throw error; // Re-throw the error to ensure migration fails
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    try {
      // Remove the triggers
      await queryInterface.sequelize.query(`
        DROP TRIGGER IF EXISTS before_insert_user_superuser;
      `);
      await queryInterface.sequelize.query(`
        DROP TRIGGER IF EXISTS before_update_user_superuser;
      `);

      // Revert the super_user role back to the first user
      const [results] = (await queryInterface.sequelize.query(
        `SELECT id FROM roles WHERE role = 'Doctor'`
      )) as any[];
      const doctorRoleId = results && results[0] && results[0].id;
      if (!doctorRoleId) throw new Error("Doctor role not found");

      await queryInterface.bulkUpdate(
        "users",
        { roleId: doctorRoleId },
        { email: "chandana@gmail.com" }
      );
      console.log("Super user account reverted successfully.");
    } catch (error) {
      console.error("Error reverting super user account:", error);
      throw error; // Re-throw the error to ensure migration fails
    }
  },
};
