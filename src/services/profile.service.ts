import axiosInstance from "./axios/axiosInstance";

/**
 * ProfileService class to handle user profile related API calls.
 */
export default class ProfileService {
  async updateUserFullNameById(userId: number, fullName: string) {
    try {
      const response = await axiosInstance.put(`/user/${userId}/name`, {
        full_name: fullName,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update user full name"
      );
    }
  }

  /**
   * Update current login user password
   */

  async updateUserPassword(
    userId: number,
    password: string,
    new_password: string
  ) {
    try {
      const response = await axiosInstance.put(`/user/${userId}/password`, {
        password,
        new_password,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update user password"
      );
    }
  }
}
