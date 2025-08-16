import { Request, Response } from "express";
import { DocumentTypeRepository } from "../repositories/DocumentTypeRepository";

export class DocumentTypeController {
  constructor(
    private documentTypeRepository = DocumentTypeRepository.getInstance()
  ) {}

  /**
   * Get all document types
   */
  getAllDocumentTypes = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const documentTypes =
      await this.documentTypeRepository.getAllDocumentTypes();

    return res.status(200).json({
      message: "Document types retrieved successfully",
      status: 200,
      error: null,
      data: documentTypes,
    });
  };

  /**
   * Find a document type by ID
   */
  findDocumentTypeById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;
    const documentType =
      await this.documentTypeRepository.findDocumentTypeById(parseInt(id));

    if (!documentType) {
      return res.status(404).json({
        message: "Document type not found",
        status: 404,
        error: null,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Document type found",
      status: 200,
      error: null,
      data: documentType,
    });
  };
}
