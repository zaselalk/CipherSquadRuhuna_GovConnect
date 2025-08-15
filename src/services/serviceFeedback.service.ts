import axiosInstance from "./axios/axiosInstance";

export type ServiceFeedback = {
  id: string;
  appointmentId: string;
  serviceName: string;
  userId: string;
  rating: number;
  comment?: string;
  type: "positive" | "neutral" | "negative";
  createdAt?: string;
  updatedAt?: string;
};

export const ServiceFeedbackService = {
getAllFeedbacks: async (): Promise<ServiceFeedback[]> => {
  const response = await axiosInstance.get("/service-feedback");
  return Array.isArray(response.data) ? response.data : response.data.data ?? [];
},


  // Get feedback by ID
  getFeedbackById: async (id: string): Promise<ServiceFeedback> => {
    const response = await axiosInstance.get(`/service-feedback/${id}`);
    return response.data.data;
  },

  // Get feedbacks by user ID (fixed route)
  getFeedbacksByUserId: async (userId: string): Promise<ServiceFeedback[]> => {
    const response = await axiosInstance.get(`/service-feedback/user/${userId}`);
    return response.data.data;
  },

  // Add a new feedback
  addFeedback: async (data: Omit<ServiceFeedback, "id" | "createdAt" | "updatedAt">): Promise<ServiceFeedback> => {
    const response = await axiosInstance.post("/service-feedback", data);
    return response.data.data;
  },

  // Update feedback by ID
  updateFeedbackById: async (
    id: string,
    data: Partial<Omit<ServiceFeedback, "id" | "createdAt" | "updatedAt">>
  ): Promise<ServiceFeedback> => {
    const response = await axiosInstance.put(`/service-feedback/${id}`, data);
    return response.data.data;
  },

  // Delete feedback by ID
  deleteFeedbackById: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/service-feedback/${id}`);
  },
};
