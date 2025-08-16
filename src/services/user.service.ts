import axiosInstance from "./axios/axiosInstance";
import { userRole } from "./types/user-role.types";
import {
  CreateUserRoleResponse,
  DeleteUserResponse,
  DeleteUserRoleResponse,
  GetAllUsersResponse,
  UpdateUserRoleResponse,
  UserRoleResponse,
} from "./types/user-services.types";

/**
 * Service for managing users and roles.
 */
export default class UserService {
  /**
   * Fetches all users.
   * @returns {Promise<any>} A promise that resolves to the list of users.
   * @throws {Error} If unable to fetch users.
   */
  async getAllUsers(): Promise<GetAllUsersResponse> {
    try {
      const response = await axiosInstance.get("/user");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to fetch users");
    }
  }

  /**
   * Creates a new user role.
   * @param {string} roleName - The name of the role.
   * @param {string[]} permissionList - The list of permissions for the role.
   * @returns {Promise<any>} A promise that resolves to the created role data.
   * @throws {Error} If unable to create the user role.
   */
  async crateUserRole(
    roleName: string,
    permissionList: string[]
  ): Promise<UserRoleResponse> {
    try {
      const response = await axiosInstance.post("/role", {
        roleName,
        permissionList,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to Create User");
    }
  }

  /**
   * Fetches all roles.
   * @returns {Promise<any>} A promise that resolves to the list of roles.
   * @throws {Error} If unable to fetch roles.
   */
  async getAllRoles(): Promise<userRole[]> {
    try {
      const response = await axiosInstance.get("/role");

      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to fetch roles");
    }
  }

  /**
   * Updates a user role.
   * @param {string} roleId - The ID of the role to update.
   * @param {string} roleName - The new name of the role.
   * @param {string[]} permissionList - The updated list of permissions for the role.
   * @returns {Promise<any>} A promise that resolves to the updated role data.
   * @throws {Error} If unable to update the user role.
   */
  async updateUserRole(
    roleId: string,
    roleName: string,
    permissionList: string[]
  ): Promise<UserRoleResponse> {
    try {
      const response = await axiosInstance.patch(`/role/${roleId}`, {
        roleName,
        permissionList,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update User Role"
      );
    }
  }

  /**
   * Deletes a user role.
   * @param {string} roleId - The ID of the role to delete.
   * @returns {Promise<any>} A promise that resolves to the deletion result.
   * @throws {Error} If unable to delete the user role.
   */
  async deleteUserRole(roleId: number): Promise<DeleteUserRoleResponse> {
    if (!roleId) throw new Error("Role ID is required");
    try {
      const response = await axiosInstance.delete(`/role/${roleId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete User Role"
      );
    }
  }

  /**
   * Fetches a role by its ID.
   * @param {string} roleId - The ID of the role to fetch.
   * @returns {Promise<any>} A promise that resolves to the role data.
   * @throws {Error} If unable to fetch the role by ID.
   */
  async getRoleById(roleId: string): Promise<UserRoleResponse> {
    try {
      const response = await axiosInstance.get(`/role/${roleId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch role by ID"
      );
    }
  }

  /**
   * Creates a new user.
   * @param {string} full_name - The full name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password for the user.
   * @param {number} role_id - The ID of the role assigned to the user.
   * @returns {Promise<any>} A promise that resolves to the created user data.
   * @throws {Error} If unable to create the user.
   */
  async createUser(
    full_name: string,
    email: string,
    password: string,
    role_id: number,
    phone_number: string
  ): Promise<CreateUserRoleResponse> {
    try {
      const response = await axiosInstance.post("/user", {
        full_name,
        email,
        password,
        role: role_id,
        phone_number,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to create user");
    }
  }

  /**
   * Changes the role of a user.
   * @param {number} userId - The ID of the user whose role is to be changed.
   * @param {number} roleId - The ID of the new role to assign to the user.
   * @returns {Promise<any>} A promise that resolves to the updated user data.
   * @throws {Error} If unable to change the user role.
   */
  async changeUserRole(
    userId: number,
    roleId: number
  ): Promise<UpdateUserRoleResponse> {
    try {
      const response = await axiosInstance.put(`/user/${userId}/role`, {
        role_id: roleId,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to change user role"
      );
    }
  }

  /**
   * Deletes a user.
   * @param {number} userId - The ID of the user to delete.
   * @returns {Promise<any>} A promise that resolves to the deletion result.
   * @throws {Error} If unable to delete the user.
   */
  async deleteUser(userId: number): Promise<DeleteUserResponse> {
    try {
      const response = await axiosInstance.delete(`/user/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to delete user");
    }
  }
}
