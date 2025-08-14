import { CitizenData } from "../types/citizen";
import axiosInstance from "./axios/axiosInstance";

class CitizenService {
    async addCitizen(data: Partial<CitizenData>): Promise<void> {
        try {
            const response = await axiosInstance.post("/citizen", data);
            return response.data;
        } catch (error: any) {
            console.error("Error adding citizen:", error);
            throw new Error(error.response?.data?.message || "Unable to add citizen");
        }
    }

   
}

export default new CitizenService();
