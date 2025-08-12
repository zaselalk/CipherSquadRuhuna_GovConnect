import axiosInstance from "./axios/axiosInstance";

export const DashboardService = {
  // Fetch the count of Household from the server
  getHouseholdCount: async () => {
    try {
      const response = await axiosInstance.get("/household/count");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching household count:", error);
      throw error;
    }
  },

  // Fetch the count of residents from the server
  getresidentCount: async () => {
    try {
      const response = await axiosInstance.get("/resident/residentCount");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching resident Count:", error);
      throw error;
    }
  },

  // Fetch the count of Division from the server
  getDivisionCount: async () => {
    try {
      const response = await axiosInstance.get("/division/count");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching division count:", error);
      throw error;
    }
  },



  // Fetch the count of Disease from the server
  getDiseaseCount: async () => {
    try {
      const response = await axiosInstance.get("/disease/count");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching disease count:", error);
      throw error;
    }
  },


  getlocations:async()=>{
    try{
      const response=await axiosInstance.get("/mapdata/getlocation");
      return response.data; 
    }catch(error){
      console.error("Error fetching locations:", error);
      throw error;
    }
  }




};