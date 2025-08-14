import { CitizenData } from "../types/citizen";
import axiosInstance from "./axios/axiosInstance";

// Define Citizen type inline
type Citizen = {
  id: number;
  fullName: string;
  email: string;
  dateOfBirth?: string;
  address?: string;
  contactNumber?: string;
  NICNumber?: string;
};

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
      const response = await axiosInstance.post("/citizen", data);
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
};
