import axiosInstance from "./axios/axiosInstance";

// Define Feedback type inline
type Feedback = {
  id: number;
  citizenId: number;
  rating: number;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const FeedbackService = {
  // Get all feedback
  getAllFeedbacks: async (): Promise<Feedback[]> => {
    const response = await axiosInstance.get("/feedback");
    return response.data.data; // 'data' from your controller
  },

  // Get feedback by ID
  getFeedbackById: async (id: number): Promise<Feedback> => {
    const response = await axiosInstance.get(`/feedback/${id}`);
    return response.data.data;
  },

  // Add new feedback
  async addFeedback(data: Partial<Feedback>): Promise<void> {
    try {
      const response = await axiosInstance.post("/feedback", data);
      return response.data;
    } catch (error: any) {
      console.error("Error adding feedback:", error);
      throw new Error(error.response?.data?.message || "Unable to add feedback");
    }
  },

  // Update feedback
  updateFeedbackById: async (
    id: number,
    data: Partial<Feedback>
  ): Promise<Feedback> => {
    const response = await axiosInstance.put(`/feedback/${id}`, data);
    return response.data.data;
  },

  // Delete feedback
  deleteFeedbackById: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/feedback/${id}`);
  },
};
