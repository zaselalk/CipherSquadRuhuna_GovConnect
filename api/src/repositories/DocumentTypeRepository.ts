import { DocumentType } from "../models/document-type";
import { DocumentTypeAttributes } from "../types/documenttype";

export class DocumentTypeRepository {
  private static instance: DocumentTypeRepository;

  private constructor() {}

  public static getInstance(): DocumentTypeRepository {
    if (!DocumentTypeRepository.instance) {
      DocumentTypeRepository.instance = new DocumentTypeRepository();
    }
    return DocumentTypeRepository.instance;
  }

  /**
   * Find a document type by ID
   */
  public async findDocumentTypeById(id: number): Promise<DocumentType | null> {
    try {
      return await DocumentType.findByPk(id);
    } catch (error) {
      console.error("Error finding document type by ID:", error);
      throw new Error("Failed to find document type");
    }
  }

  /**
   * Get all document types
   */
  public async getAllDocumentTypes(): Promise<DocumentType[]> {
    try {
      return await DocumentType.findAll();
    } catch (error) {
      console.error("Error getting all document types:", error);
      throw new Error("Failed to retrieve document types");
    }
  }
}
