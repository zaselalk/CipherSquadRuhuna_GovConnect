import { AxiosError } from "axios";
import axiosInstance from "./axios/axiosInstance";

interface ReturnUser {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    role: string;
    permission: string;
  };
  token: string;
}

interface LoginResponse {
  message: string;
  user: ReturnUser;
}

/**
 * AuthServices class provides methods for user authentication and role management.
 */
class AuthServices {
  /**
   * Logs in a user
   * @param email User's email
   * @param password User's password
   * @returns User information
   * @throws Error if authentication fails
   */
  async login(email: string, password: string): Promise<ReturnUser> {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem("token", data.user.token);
      return data.user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message ||
            "Could not authenticate you. Please try again."
        );
      }
      throw new Error("Could not authenticate you. Please try again.");
    }
  }

  /**
   * Creates a new user role
   * @param roleName Name of the role
   * @param permissionList List of permissions for the role
   * @returns Created role information
   * @throws Error if unable to create the role
   */
  async crateUserRole(roleName: string, permissionList: string[]) {
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
   * Gets all user roles
   * @returns List of all user roles
   * @throws Error if unable to fetch roles
   */
  async getAllRoles() {
    try {
      const response = await axiosInstance.get("/role");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to fetch roles");
    }
  }

  /**
   * Updates an existing user role
   * @param roleId ID of the role to update
   * @param roleName New name for the role
   * @param permissionList Updated list of permissions for the role
   * @returns Updated role information
   * @throws Error if unable to update the role
   */
  async updateUserRole(
    roleId: string,
    roleName: string,
    permissionList: string[]
  ) {
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
   * Deletes a user role by its ID
   * @param roleId ID of the role to delete
   * @returns  Response data from the deletion request
   * @throws Error if unable to delete the role
   */
  async deleteUserRole(roleId: string) {
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
   * Gets a user role by its ID
   * @param roleId ID of the role to fetch
   * @returns Role information
   * @throws Error if unable to fetch the role
   */
  async getRoleById(roleId: string) {
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
   * Checks if the user's token is valid
   * @returns Response data indicating token validity
   * @throws Error if unable to check the token
   */
  async checkToken() {
    try {
      const response = await axiosInstance.get("/auth/check");

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to check token");
    }
  }
}

export default AuthServices;
