import { stat } from "fs";
import { AppointmentDocumentService } from "../services/appointmentDocumentService";
import e, { Request, Response } from "express";

export class AppointmentDocumentController {
    constructor(private appointmentDocumentService = new AppointmentDocumentService()) { }


    public getAllDocuments = async (req: Request, res: Response) => {
        const docs = await this.appointmentDocumentService.getAllDocuments();
        if (!docs || docs.length === 0) {
            return res.status(404).json({
                message: "No documents found",
                status: 404,
                error: null,
                data: null
            });
        }
        return res.status(200).json({
            message: "Documents retrieved successfully",
            status: 200,
            error: null,
            data: docs
        });

    }
    public getDocumentById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const document = await this.appointmentDocumentService.getDocumentById(parseInt(id));
        if (!document) {
            return res.status(404).json({
                message: "Document not found",
                status: 404,
                error: null,
                data: null
            });
        }
        return res.status(200).json({
            message: "Document retrieved successfully",
            status: 200,
            error: null,
            data: document
        });
    }
    public createDocument = async (req: Request, res: Response) => {
        const newDocument = await this.appointmentDocumentService.createDocument(req.body);
        if (!newDocument) {
            return res.status(400).json({
                message: "Document creation failed",
                status: 400,
                error: null,
                data: null
            });
        }
        return res.status(201).json({
            message: "Document created successfully",
            status: 201,
            error: null,
            data: newDocument
        });
    }

    public updateDocument = async (req: Request, res: Response) => {
        const { id } = req.params;
        const updatedDocument = await this.appointmentDocumentService.updateDocument(parseInt(id), req.body);
        if (!updatedDocument) {
            return res.status(400).json({
                message: "Document update failed",
                status: 400,
                error: null,
                data: null
            });
        }
        return res.status(200).json({
            message: "Document updated successfully",
            status: 200,
            error: null,
            data: updatedDocument
        });
    }

    public deleteDocument = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleted = await this.appointmentDocumentService.deleteDocument(parseInt(id));
        if (!deleted) {
            return res.status(400).json({
                message: "Document deletion failed",
                status: 400,
                error: null,
                data: null
            });
        }
        return res.status(200).json({
            message: "Document deleted successfully",
            status: 200,
            error: null,
            data: null
        });
    }

}