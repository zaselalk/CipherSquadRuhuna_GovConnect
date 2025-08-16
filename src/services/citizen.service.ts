import { Citizen, CitizenData, CitizenLoginResponse } from "../types/citizen";
import axiosInstance from "./axios/axiosInstance";

export const CitizenService = {
  /**
   *  Get all citizens
   * @returns A list of all citizens
   */
  getAllCitizens: async (): Promise<Citizen[]> => {
    const response = await axiosInstance.get("/citizen"); // relative to VITE_BACKEND_URL
    return response.data.data; // 'data' comes from your controller response
  },

  /**
   * Get a citizen by ID
   * @param id - The ID of the citizen to retrieve
   * @returns The citizen data
   */
  getCitizenById: async (id: number): Promise<Citizen> => {
    const response = await axiosInstance.get(`/citizen/${id}`);
    return response.data.data;
  },

  /**
   * Add a new citizen
   * @param data - The citizen data to add
   * @returns The added citizen data
   */
  async addCitizen(data: Partial<CitizenData>): Promise<void> {
    try {
      const response = await axiosInstance.post("/citizen/auth/register", data);
      return response.data;
    } catch (error: any) {
      console.error("Error adding citizen:", error);
      throw new Error(error.response?.data.error || "Unable to add citizen");
    }
  },

  /**
   *  Update a citizen by ID
   * @param id - The ID of the citizen to update
   * @param data - The data to update the citizen with
   * @returns  The updated citizen data
   */
  updateCitizenById: async (
    id: number,
    data: Partial<Citizen>
  ): Promise<Citizen> => {
    const response = await axiosInstance.put(`/citizen/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a citizen by ID
   * @param id - The ID of the citizen to delete
   * @returns A promise that resolves when the citizen is deleted
   */
  deleteCitizenById: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/citizen/${id}`);
  },

  /**
   *  Citizen registration service
   * @param email - The email of the citizen to register
   * @param password - The password of the citizen to register
   * @returns  The registered citizen data
   */
  login: async (
    email: string,
    password: string
  ): Promise<CitizenLoginResponse> => {
    try {
      const response = await axiosInstance.post("/citizen/auth/login", {
        email,
        password,
      });
      return response.data.data;
    } catch (error: any) {
      console.error("Error logging in citizen:", error);
      throw new Error(
        error.response?.data?.message || "Unable to log in citizen"
      );
    }
  },

  /**
   * Verify citizen email
   * @param token - The verification token
   * @returns A promise that resolves when the email is verified
   */
  checkToken: async (): Promise<{ data: Citizen }> => {
    try {
      const response = await axiosInstance.get("/citizen/auth/check");
      return response.data;
    } catch (error: any) {
      console.error("Error checking citizen token:", error);
      throw new Error(
        error.response?.data?.message || "Unable to check citizen token"
      );
    }
  },

  /**
   * Verify citizen email
   * @param token - The verification token
   */
  verifyEmail: async (token: string): Promise<Citizen> => {
    try {
      const response = await axiosInstance.get(
        `/citizen/auth/verify-email?token=${token}`
      );
      return response.data.data;
    } catch (error: any) {
      console.error("Error verifying citizen email:", error);
      throw new Error(
        error.response?.data?.message || "Unable to verify citizen email"
      );
    }
  },
};
