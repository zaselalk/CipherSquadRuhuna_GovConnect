import axiosInstance from "./axios/axiosInstance";

class ResidentService {
  // Add Resident
  async addResident(newResidentData: any) {
    const response = await axiosInstance.post(
      "/resident/createResident",
      newResidentData
    );
    console.log("newResidentData", newResidentData);

    const data = response.data;

    if (!data.success) {
      throw { response: { data: data } };
    }

    // Check if the response contains a success message
    return data;
  }

  //resident Overview
  async getResidentOverview() {
    try {
      const response = await axiosInstance.get("/resident/residentOverview");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch residents overview"
      );
    }
  }

  // Get Resident Count
  async getResidentCount() {
    try {
      const response = await axiosInstance.get("/resident/residentCount");
      return response.data.data.count;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch resident count"
      );
    }
  }
  // resident login
  async loginResidentByEmailandPassword(email: string, password: string) {
    try {
      const response = await axiosInstance.post("/resident/login", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response?.data.error || "Unable to login resident");
    }
  }

  async getSingleResident(id: string) {
    try {
      const response = await axiosInstance.get(`/resident/id/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch resident details"
      );
    }
  }

  // Check if resident token is valid
  async checkResidentToken() {
    try {
      const token = localStorage.getItem("residentToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axiosInstance.get("/resident/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to verify resident token"
      );
    }
  }

  // Get current resident profile
  async getCurrentResidentProfile() {
    try {
      const token = localStorage.getItem("residentToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axiosInstance.get("/resident/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch resident profile"
      );
    }
  }

  // Search Resident by NIC
  async searchResidentByNic(nic: string) {
    try {
      const response = await axiosInstance.get(`/resident/nic/${nic}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to fetch resident by NIC"
      );
    }
  }

  // Update Resident Data
  async updateResidentData(residentId: string, updatedData: any) {
    try {
      const response = await axiosInstance.put(
        `/resident/update/${residentId}`,
        updatedData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Unable to update resident data"
      );
    }
  }
}

export default new ResidentService();
