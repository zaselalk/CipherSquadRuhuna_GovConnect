import { CitizenDocs } from "../models/citizendocs";
import { CitizenDocAttributes, CitizenDocCreationAttributes } from "../types/citizendoc";


export class CitizenDocsRepository {
  private static instance: CitizenDocsRepository;

  private constructor() {}

  public static getInstance(): CitizenDocsRepository {
    if (!CitizenDocsRepository.instance) {
      CitizenDocsRepository.instance = new CitizenDocsRepository();
    }
    return CitizenDocsRepository.instance;
  }

  /**
   * Create a new citizen document
   * @param data - Document data
   * @return The created document
   */
  public async createDocument(
    data: CitizenDocCreationAttributes
  ): Promise<CitizenDocs> {
    try {
      const doc = await CitizenDocs.create(data);
      return doc;
    } catch (error) {
      console.error("Error creating document:", error);
      throw new Error("Failed to create document");
    }
  }

  /**
   * Find a document by ID
   * @param id - Document ID
   * @return The found document or null
   */
  public async findDocumentById(id: number): Promise<CitizenDocs | null> {
    try {
      const doc = await CitizenDocs.findByPk(id);
      return doc;
    } catch (error) {
      console.error("Error finding document by ID:", error);
      throw new Error("Failed to find document");
    }
  }

  /**
   * Find all documents for a citizen
   * @param citizen_id - Citizen ID
   * @return Array of documents
   */
  public async findDocumentsByCitizen(citizen_id: number): Promise<CitizenDocs[]> {
    try {
      return await CitizenDocs.findAll({ where: { citizen_id } });
    } catch (error) {
      console.error("Error finding documents by citizen ID:", error);
      throw new Error("Failed to find documents");
    }
  }

  /**
   * Update a document by ID
   * @param id - Document ID
   * @param updateData - Data to update
   * @return Updated document or null if not found
   */
  public async updateDocument(
    id: number,
    updateData: Partial<CitizenDocAttributes>
  ): Promise<CitizenDocs | null> {
    try {
      const doc = await this.findDocumentById(id);
      if (!doc) return null;
      await doc.update(updateData);
      return doc;
    } catch (error) {
      console.error("Error updating document by ID:", error);
      throw new Error("Failed to update document");
    }
  }

  /**
   * Delete a document by ID
   * @param id - Document ID
   * @return True if deleted, false if not found
   */
  public async deleteDocument(id: number): Promise<boolean> {
    try {
      const doc = await this.findDocumentById(id);
      if (!doc) return false;
      await doc.destroy();
      return true;
    } catch (error) {
      console.error("Error deleting document by ID:", error);
      throw new Error("Failed to delete document");
    }
  }

  /**
   * Get all documents
   * @return Array of all documents
   */
  public async getAllDocuments(): Promise<CitizenDocs[]> {
    try {
      return await CitizenDocs.findAll();
    } catch (error) {
      console.error("Error getting all documents:", error);
      throw new Error("Failed to retrieve documents");
    }
  }
}
