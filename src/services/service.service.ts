// src/api/DepartmentServicesApi.ts
import axiosInstance from "./axios/axiosInstance";

export type DepartmentService = {
  service_id: number;
  dep_id: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

// Response type from backend
interface ApiResponse<T> {
  status: number;
  message: string;
  error: any;
  data: T;
}

export const DepartmentServicesApi = {
  getAllServices: async (): Promise<DepartmentService[]> => {
    const response = await axiosInstance.get<ApiResponse<DepartmentService[]>>("/departmentservices");
    return response.data.data;
  },

  getServicesByDepartment: async (dep_id: number): Promise<DepartmentService[]> => {
    const response = await axiosInstance.get<ApiResponse<DepartmentService[]>>(`/depservice/department/${dep_id}`);
    return response.data.data;
  },

  getServiceById: async (id: number): Promise<DepartmentService> => {
    const response = await axiosInstance.get<ApiResponse<DepartmentService>>(`/depservice/${id}`);
    return response.data.data;
  },

  addService: async (data: Partial<DepartmentService>): Promise<void> => {
    await axiosInstance.post<ApiResponse<void>>("/depservice", data);
  },

  updateServiceById: async (id: number, data: Partial<DepartmentService>): Promise<DepartmentService> => {
    const response = await axiosInstance.put<ApiResponse<DepartmentService>>(`/depservice/${id}`, data);
    return response.data.data;
  },

  deleteServiceById: async (id: number): Promise<void> => {
    await axiosInstance.delete<ApiResponse<void>>(`/depservice/${id}`);
  },
};
