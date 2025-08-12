import { describe, it, expect, vi } from "vitest";
import ProfileService from "../profile.service";
import axiosInstance from "../axios/axiosInstance";

vi.mock("../axios/axiosInstance");

describe("ProfileService", () => {
  const profileService = new ProfileService();

  describe("updateUserFullNameById", () => {
    /**
     * Test case to check if the user's full name is updated successfully
     * by calling the API with the correct parameters.
     */
    it("should update the user's full name successfully", async () => {
      const mockResponse = { data: { success: true } };
      (axiosInstance.put as any).mockResolvedValue(mockResponse);

      const userId = 1;
      const fullName = "John Doe";

      const result = await profileService.updateUserFullNameById(
        userId,
        fullName
      );

      expect(axiosInstance.put).toHaveBeenCalledWith(`/user/${userId}/name`, {
        full_name: fullName,
      });
      expect(result).toEqual(mockResponse.data);
    });

    /**
     * Test case to check if an error is thrown when the API call fails
     * while trying to update the user's full name.
     */
    it("should throw an error if the API call fails", async () => {
      // Define the error message to be used in the mock
      const errorMessage = "Unable to update user full name";

      // Mock the rejected value of the axiosInstance.put method
      (axiosInstance.put as any).mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      const userId = 1;
      const fullName = "John Doe";

      await expect(
        profileService.updateUserFullNameById(userId, fullName)
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("updateUserPassword", () => {
    /**
     * Test case to check if the user's password is updated successfully
     * by calling the API with the correct parameters.
     */
    it("should update the user's password successfully", async () => {
      const mockResponse = { data: { success: true } };
      (axiosInstance.put as any).mockResolvedValue(mockResponse);

      const userId = 1;
      const password = "oldPassword";
      const newPassword = "newPassword";

      const result = await profileService.updateUserPassword(
        userId,
        password,
        newPassword
      );

      expect(axiosInstance.put).toHaveBeenCalledWith(
        `/user/${userId}/password`,
        {
          password,
          new_password: newPassword,
        }
      );
      expect(result).toEqual(mockResponse.data);
    });

    /**
     * Test case to check if an error is thrown when the API call fails
     * while trying to update the user's password.
     */
    it("should throw an error if the API call fails", async () => {
      const errorMessage = "Unable to update user password";
      (axiosInstance.put as any).mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      const userId = 1;
      const password = "oldPassword";
      const newPassword = "newPassword";

      await expect(
        profileService.updateUserPassword(userId, password, newPassword)
      ).rejects.toThrow(errorMessage);
    });
  });
});
