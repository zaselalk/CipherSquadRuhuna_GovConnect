// src/api/DepartmentServicesApi.ts
import axiosInstance from "./axios/axiosInstance";

export type DepartmentService = {
  id?: number;
  dep_id: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export const DepartmentServicesApi = {
  // Get all department services
  getAllServices: async (): Promise<DepartmentService[]> => {
    const response = await axiosInstance.get("/departmentservices");
    return response.data.data;
  },

  // Get services for a specific department
  getServicesByDepartment: async (dep_id: number): Promise<DepartmentService[]> => {
    const response = await axiosInstance.get(`/depservice/department/${dep_id}`);
    return response.data.data;
  },

  // Get service by ID
  getServiceById: async (id: number): Promise<DepartmentService> => {
    const response = await axiosInstance.get(`/depservice/${id}`);
    return response.data.data;
  },

  addService: async (data: Partial<DepartmentService>): Promise<void> => {
    const response = await axiosInstance.post("/depservice", data);
    return response.data;
  },

  updateServiceById: async (id: number, data: Partial<DepartmentService>): Promise<DepartmentService> => {
    const response = await axiosInstance.put(`/depservice/${id}`, data);
    return response.data.data;
  },

  deleteServiceById: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/depservice/${id}`);
  },
};
