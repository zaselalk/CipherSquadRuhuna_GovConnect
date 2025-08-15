import { DepartmentData } from "../types/department";
import axiosInstance from "./axios/axiosInstance";

// Define Department type inline
type Department = {
  dep_id: number;
  name: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export const DepartmentService = {
  // Get all departments
  getAllDepartments: async (): Promise<Department[]> => {
    const response = await axiosInstance.get("/department"); // relative to VITE_BACKEND_URL
    return response.data.data;
  },

  // Get department by ID
  getDepartmentById: async (id: number): Promise<Department> => {
    const response = await axiosInstance.get(`/department/${id}`);
    return response.data.data;
  },

  // Add a new department
  async addDepartment(data: Partial<DepartmentData>): Promise<void> {
    try {
      const response = await axiosInstance.post("/department", data);
      return response.data;
    } catch (error: any) {
      console.error("Error adding department:", error);
      throw new Error(error.response?.data?.message || "Unable to add department");
    }
  },

  // Update department by ID
  updateDepartmentById: async (
    id: number,
    data: Partial<Department>
  ): Promise<Department> => {
    const response = await axiosInstance.put(`/department/${id}`, data);
    return response.data.data;
  },

  // Delete department by ID
  deleteDepartmentById: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/department/${id}`);
  },
};
