// src/routes/documentType.routes.ts
import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { DocumentTypeController } from "../controllers/DocumentTypeController";

const DocumentTypeRouter: Router = Router();
const documentTypeController = new DocumentTypeController();

// Get all document types
DocumentTypeRouter.get(
  "/",
  catchAsync(documentTypeController.getAllDocumentTypes)
);

// Get document type by ID
DocumentTypeRouter.get(
  "/:id",
  catchAsync(documentTypeController.findDocumentTypeById)
);

export default DocumentTypeRouter;
