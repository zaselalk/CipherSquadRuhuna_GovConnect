import { DocumentTypeRepository } from "../repositories/DocumentTypeRepository";
import { DocumentTypeAttributes } from "../types/documenttype";

export class DocumentTypeService {
  constructor(
    private documentTypeRepository = DocumentTypeRepository.getInstance()
  ) {}

  // Get all document types as plain objects
  public async getAllDocumentTypes(): Promise<DocumentTypeAttributes[]> {
    const documentTypes = await this.documentTypeRepository.getAllDocumentTypes();
    return documentTypes.map(dt => dt.get({ plain: true }));
  }

  // Get a single document type by ID as plain object
  public async getDocumentTypeById(
    id: number
  ): Promise<DocumentTypeAttributes | null> {
    const documentType = await this.documentTypeRepository.findDocumentTypeById(id);
    return documentType ? documentType.get({ plain: true }) : null;
  }
}
