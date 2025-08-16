import axiosInstance from "./axios/axiosInstance";

export const AppointmentService = {
  createAppointment: async (data: any) => {
    const response = await axiosInstance.post("appointments/with-documents", data);
    return response.data;
  }
};
