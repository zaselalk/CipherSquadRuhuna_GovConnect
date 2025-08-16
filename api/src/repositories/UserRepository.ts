import { Op } from "sequelize";
import { User } from "../models";

/**
 * Repository for handling user-related database operations.
 * This class provides methods to create, find, update, and delete users.
 */
export class UserRepository {
  /**
   * Finds a user by their email address.
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the found User instance or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: {
        email,
        deletedAt: null,
      },
      attributes: ["id", "name", "email", "password", "role"],
    });
  }

  /**
   * Finds a user by their ID and includes their role with permissions.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the found UserWithPermission instance or null if not found.
   */
  async findById(id: number): Promise<User | null> {
    return User.findOne({
      where: {
        id,
        deletedAt: null,
      },
      attributes: ["id", "name", "email", "role"],
    });
  }

  /**
   * Finds a user by their ID and includes their role, returning the password as well.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the found LoginUser instance or null if not found.
   */
  async findByIdWithPassword(id: number): Promise<User | null> {
    return User.findOne({
      where: {
        id,
        deletedAt: null,
      },
      attributes: ["id", "name", "email", "password"],
    });
  }

  /**
   * Retrieves all users, excluding the logged-in user.
   * @param page - The page number for pagination.
   * @param limit - The number of users to retrieve per page.
   * @param user - The logged-in user to exclude from the results.
   * @returns A promise that resolves to an array of User instances.
   */
  async getAllUsers(page: number, limit: number, user: any): Promise<User[]> {
    // maximum limit is 50
    if (limit > 50) limit = 50;
    const offset = (page - 1) * limit;
    return User.findAll({
      where: {
        email: {
          [Op.not]: user.email, // Exclude the logged-in user
        },
        deletedAt: null, // Exclude soft-deleted users
      },

      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    });
  }

  /**
   * Creates a new user with the specified details.
   * @param name - The name of the user.
   * @param roleId - The ID of the role assigned to the user.
   * @param email - The email address of the user.
   * @param password - The password of the user (should be hashed before calling this method).
   * @param phone_number - The phone number of the user.
   * @returns A promise that resolves to the created User instance.
   */
  async CreateUser(
    name: string,
    role: string,
    email: string,
    password: string,
    phone_number: string
  ): Promise<User> {
    return User.create({
      name,
      role,
      email,
      password,
      phone_number,
    });
  }

  /**
   * Updates the full name of a user by their ID.
   * @param id - The ID of the user to update.
   * @param full_name - The new full name for the user.
   * @returns A promise that resolves to the updated User instance or null if not found.
   */
  async updateUserFullNameById(
    id: number,
    full_name: string
  ): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    user.name = full_name;
    await user.save();
    return user;
  }

  /**
   * Change user password by id, This method should provide the hashed password
   * @param id - The ID of the user whose password is to be changed.
   * @param hashedPassword - The new hashed password for the user.
   * @returns A promise that resolves to the updated User instance or null if not found.
   */
  async changeUserPasswordById(
    id: number,
    hashedPassword: string
  ): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    user.password = hashedPassword;
    await user.save();
    return user;
  }

  /**
   * Soft deletes a user by setting the deletedAt field to the current date.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to true if the user was successfully soft-deleted, false otherwise.
   */
  async deleteUserById(id: number): Promise<boolean> {
    const [updatedRows] = await User.update(
      { deletedAt: new Date() }, // Soft delete by setting deletedAt
      {
        where: { id: id, deletedAt: null }, // Ensure the user is not already soft-deleted
      }
    );

    return updatedRows > 0; // Check if any rows were updated
  }
}
