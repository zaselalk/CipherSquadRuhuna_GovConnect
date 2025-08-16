// src/services/OfficerService.ts
import axiosInstance from "./axios/axiosInstance";

class OfficerService {
  // Add Officer
  async addOfficer(newOfficerData: any) {
    const response = await axiosInstance.post("/officers", newOfficerData);
    console.log("newOfficerData", newOfficerData);

    const data = response.data;

    if (!data) {
      throw { response: { data: "Failed to create officer" } };
    }

    return data;
  }

  // Get all Officers
  async getAllOfficers() {
    try {
      const response = await axiosInstance.get("/officer");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch officers"
      );
    }
  }

  // Fetch all users for assigning as officers
  async getAllUsers() {
    try {
      const response = await axiosInstance.get("/user"); // Reuse your existing endpoint
      return response.data.data || response.data; // adjust based on your API response structure
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Unable to fetch users");
    }
  }

  // Get Officer by ID
  async getOfficerById(id: number) {
    try {
      const response = await axiosInstance.get(`/user/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch officer details"
      );
    }
  }

  // Update Officer
  async updateOfficer(officerId: number, updatedData: any) {
    try {
      const response = await axiosInstance.put(
        `/officers/${officerId}`,
        updatedData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update officer data"
      );
    }
  }

  // Delete Officer
  async deleteOfficer(officerId: number) {
    try {
      const response = await axiosInstance.delete(`/officer/${officerId}`);
      return response.status === 204;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to delete officer"
      );
    }
  }

  // Get Officers by Department
  async getOfficersByDepartment(dep_id: number) {
    try {
      const response = await axiosInstance.get(`/officer/department/${dep_id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch officers by department"
      );
    }
  }
}

export default new OfficerService();
