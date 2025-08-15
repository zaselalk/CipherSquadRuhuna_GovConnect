import { CitizenDocsData } from "../types/citizendocs";
import axiosInstance from "./axios/axiosInstance";

// Define CitizenDoc type
export type CitizenDoc = {
  id: number;
  citizen_id: number;
  document_id: number;
  file_name: string;
  file_path: string;
  mime_type?: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export const CitizenDocsService = {
  // Upload multiple documents
  uploadDocuments: async (data: FormData): Promise<CitizenDoc[]> => {
    const response = await axiosInstance.post("/citizen-docs/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  },

  // Get all documents
  getAllDocuments: async (): Promise<CitizenDoc[]> => {
    const response = await axiosInstance.get("/citizen-docs");
    return response.data.data;
  },

  // Get documents by citizen ID
  getDocumentsByCitizen: async (citizen_id: number): Promise<CitizenDoc[]> => {
    const response = await axiosInstance.get(`/citizen-docs/citizen/${citizen_id}`);
    return response.data.data;
  },

  // Update document by ID
  updateDocumentById: async (
    id: number,
    data: Partial<CitizenDocsData>
  ): Promise<CitizenDoc> => {
    const response = await axiosInstance.put(`/citizen-docs/${id}`, data);
    return response.data.data;
  },

  // Delete document by ID
  deleteDocumentById: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/citizen-docs/${id}`);
  },
};
