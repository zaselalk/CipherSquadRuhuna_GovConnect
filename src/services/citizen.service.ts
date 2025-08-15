import { Citizen, CitizenData, CitizenLoginResponse } from "../types/citizen";
import axiosInstance from "./axios/axiosInstance";

export const CitizenService = {
  // Get all citizens
  getAllCitizens: async (): Promise<Citizen[]> => {
    const response = await axiosInstance.get("/citizen"); // relative to VITE_BACKEND_URL
    return response.data.data; // 'data' comes from your controller response
  },

  // Get citizen by ID
  getCitizenById: async (id: number): Promise<Citizen> => {
    const response = await axiosInstance.get(`/citizen/${id}`);
    return response.data.data;
  },

  async addCitizen(data: Partial<CitizenData>): Promise<void> {
    try {
      const response = await axiosInstance.post("/citizen/auth/register", data);
      return response.data;
    } catch (error: any) {
      console.error("Error adding citizen:", error);
      throw new Error(error.response?.data?.message || "Unable to add citizen");
    }
  },
  // Update citizen
  updateCitizenById: async (
    id: number,
    data: Partial<Citizen>
  ): Promise<Citizen> => {
    const response = await axiosInstance.put(`/citizen/${id}`, data);
    return response.data.data;
  },

  // Delete citizen
  deleteCitizenById: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/citizen/${id}`);
  },

  //loginservice
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

  // Token validation service
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
};
