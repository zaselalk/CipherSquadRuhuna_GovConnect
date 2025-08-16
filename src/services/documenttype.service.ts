// src/api/DocumentTypeApi.ts
import axiosInstance from "./axios/axiosInstance";

export type DocumentType = {
  doc_id?: number;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

interface ApiResponse<T> {
  status: number;
  message: string;
  error: any;
  data: T;
}

export const DocumentTypeApi = {
  getAllDocumentTypes: async (): Promise<DocumentType[]> => {
    const response = await axiosInstance.get<ApiResponse<DocumentType[]>>("/document-types");
    return response.data.data;
  },

  getDocumentTypeById: async (id: number): Promise<DocumentType> => {
    const response = await axiosInstance.get<ApiResponse<DocumentType>>(`/document-types/${id}`);
    return response.data.data;
  },
};
