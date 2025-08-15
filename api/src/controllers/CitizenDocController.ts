
import { Request, Response } from "express";

import fs from "fs";
import { CitizenDocCreationAttributes } from "../types/citizendoc";
import { CitizenDocsRepository } from "../repositories/CitizenDocRepository";

interface UploadDocumentRequest extends Request {
  body: Partial<CitizenDocCreationAttributes>;
  files?: Express.Multer.File[]; // optional
}


export class CitizenDocsController {
  static uploadDocuments(uploadDocuments: any): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
      throw new Error("Method not implemented.");
  }
  constructor(private citizenDocsRepository = CitizenDocsRepository.getInstance()) {}

  /**
   * Upload one or multiple documents for a citizen
   * @param req - Request object with files and body
   * @param res - Response object
   */
  uploadDocuments = async (req: UploadDocumentRequest, res: Response): Promise<Response> => {
  try {
    const citizen_id = req.body.citizen_id;
    const document_id = req.body.document_id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
        status: 400,
        error: null,
        data: null,
      });
    }

    const uploadedDocs = [];

    for (const file of req.files) {

        const relativePath = `uploads/documents/${file.filename}`; // <-- relative path


      const docData: CitizenDocCreationAttributes = {
        citizen_id: Number(citizen_id),
        document_id: Number(document_id),
        file_name: file.originalname,

        file_path: relativePath, // use relative path for storage
        
        mime_type: file.mimetype,
      };

      const doc = await this.citizenDocsRepository.createDocument(docData);
      uploadedDocs.push(doc);
    }

    return res.status(201).json({
      message: "Documents uploaded successfully",
      status: 201,
      error: null,
      data: uploadedDocs,
    });
  } catch (error) {
    console.error("Error uploading documents:", error);
    return res.status(500).json({
      message: "Failed to upload documents",
      status: 500,
      error,
      data: null,
    });
  }
};


  /**
   * Get all documents
   */
  getAllDocuments = async (req: Request, res: Response): Promise<Response> => {
    try {
      const docs = await this.citizenDocsRepository.getAllDocuments();
      return res.status(200).json({
        message: "Documents retrieved successfully",
        status: 200,
        error: null,
        data: docs,
      });
    } catch (error) {
      console.error("Error retrieving documents:", error);
      return res.status(500).json({
        message: "Failed to retrieve documents",
        status: 500,
        error,
        data: null,
      });
    }
  };

  /**
   * Get documents for a specific citizen
   */
  getDocumentsByCitizen = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { citizen_id } = req.params;
      const docs = await this.citizenDocsRepository.findDocumentsByCitizen(Number(citizen_id));
      return res.status(200).json({
        message: "Documents retrieved successfully",
        status: 200,
        error: null,
        data: docs,
      });
    } catch (error) {
      console.error("Error retrieving documents for citizen:", error);
      return res.status(500).json({
        message: "Failed to retrieve documents",
        status: 500,
        error,
        data: null,
      });
    }
  };

  /**
   * Delete a document by ID
   */
  deleteDocumentById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const doc = await this.citizenDocsRepository.findDocumentById(Number(id));
      if (!doc) {
        return res.status(404).json({
          message: "Document not found",
          status: 404,
          error: null,
          data: null,
        });
      }

      // Remove file from storage
      if (fs.existsSync(doc.file_path)) {
        fs.unlinkSync(doc.file_path);
      }

      await this.citizenDocsRepository.deleteDocument(Number(id));

      return res.status(200).json({
        message: "Document deleted successfully",
        status: 200,
        error: null,
        data: null,
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      return res.status(500).json({
        message: "Failed to delete document",
        status: 500,
        error,
        data: null,
      });
    }
  };

  /**
   * Update document info (not the file itself)
   */
  updateDocumentById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedDoc = await this.citizenDocsRepository.updateDocument(Number(id), updateData);
      if (!updatedDoc) {
        return res.status(404).json({
          message: "Document not found",
          status: 404,
          error: null,
          data: null,
        });
      }

      return res.status(200).json({
        message: "Document updated successfully",
        status: 200,
        error: null,
        data: updatedDoc,
      });
    } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({
        message: "Failed to update document",
        status: 500,
        error,
        data: null,
      });
    }
  };
}
