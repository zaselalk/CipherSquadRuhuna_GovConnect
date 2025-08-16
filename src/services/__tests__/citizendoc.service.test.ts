import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../axios/axiosInstance";
import { CitizenDoc, CitizenDocsService } from "../citizendocs.service";

vi.mock("../axios/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));


describe("CitizenDocsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("uploadDocuments", () => {
    it("should upload documents successfully", async () => {
      const mockDocs: CitizenDoc[] = [
        { id: 1, citizen_id: 1, document_id: 1, file_name: "doc.pdf", file_path: "/files/doc.pdf", uploadedAt: "2025-08-16", createdAt: "2025-08-16", updatedAt: "2025-08-16" }
      ];
      (axiosInstance.post as any).mockResolvedValue({ data: { data: mockDocs } });

      const formData = new FormData();
      formData.append("file", new Blob(["content"], { type: "application/pdf" }));

      const result = await CitizenDocsService.uploadDocuments(formData);
      expect(axiosInstance.post).toHaveBeenCalledWith("/citizen-docs/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      expect(result).toEqual(mockDocs);
    });
  });

  describe("getAllDocuments", () => {
    it("should fetch all documents", async () => {
      const mockDocs: CitizenDoc[] = [{ id: 1, citizen_id: 1, document_id: 1, file_name: "doc.pdf", file_path: "/files/doc.pdf", uploadedAt: "2025-08-16", createdAt: "2025-08-16", updatedAt: "2025-08-16" }];
      (axiosInstance.get as any).mockResolvedValue({ data: { data: mockDocs } });

      const result = await CitizenDocsService.getAllDocuments();
      expect(axiosInstance.get).toHaveBeenCalledWith("/citizen-docs");
      expect(result).toEqual(mockDocs);
    });
  });

  describe("getDocumentsByCitizen", () => {
    it("should fetch documents by citizen ID", async () => {
      const citizenId = 1;
      const mockDocs: CitizenDoc[] = [{ id: 1, citizen_id: citizenId, document_id: 1, file_name: "doc.pdf", file_path: "/files/doc.pdf", uploadedAt: "2025-08-16", createdAt: "2025-08-16", updatedAt: "2025-08-16" }];
      (axiosInstance.get as any).mockResolvedValue({ data: { data: mockDocs } });

      const result = await CitizenDocsService.getDocumentsByCitizen(citizenId);
      expect(axiosInstance.get).toHaveBeenCalledWith(`/citizen-docs/citizen/${citizenId}`);
      expect(result).toEqual(mockDocs);
    });
  });

  describe("updateDocumentById", () => {
    it("should update a document successfully", async () => {
      const id = 1;
      const updatedData = { file_name: "updated.pdf" };
      const mockDoc: CitizenDoc = { id, citizen_id: 1, document_id: 1, file_name: updatedData.file_name!, file_path: "/files/updated.pdf", uploadedAt: "2025-08-16", createdAt: "2025-08-16", updatedAt: "2025-08-16" };
      (axiosInstance.put as any).mockResolvedValue({ data: { data: mockDoc } });

      const result = await CitizenDocsService.updateDocumentById(id, updatedData);
      expect(axiosInstance.put).toHaveBeenCalledWith(`/citizen-docs/${id}`, updatedData);
      expect(result).toEqual(mockDoc);
    });
  });

  describe("deleteDocumentById", () => {
    it("should delete a document successfully", async () => {
      const id = 1;
      (axiosInstance.delete as any).mockResolvedValue({});

      await CitizenDocsService.deleteDocumentById(id);
      expect(axiosInstance.delete).toHaveBeenCalledWith(`/citizen-docs/${id}`);
    });
  });
});
