import { Router, Request, Response, NextFunction } from "express";
import catchAsync from "../util/catchAsync";
import { CitizenDocsController } from "../controllers/CitizenDocController";
import multer from "multer";
import path from "path";
import fs from "fs";

const CitizenDocsRouter: Router = Router();
const citizenDocsController = new CitizenDocsController();

// Multer configuration
const uploadDir = path.join(__dirname, "../uploads/documents");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
CitizenDocsRouter.post(
  "/upload",
  upload.array("documents"),
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // cast req to your custom type inside the handler
    return citizenDocsController.uploadDocuments(req as any, res);
  })
);

CitizenDocsRouter.get(
  "/",
  catchAsync(citizenDocsController.getAllDocuments)
);

CitizenDocsRouter.get(
  "/citizen/:citizen_id",
  catchAsync(citizenDocsController.getDocumentsByCitizen)
);

CitizenDocsRouter.put(
  "/:id",
  catchAsync(citizenDocsController.updateDocumentById)
);

CitizenDocsRouter.delete(
  "/:id",
  catchAsync(citizenDocsController.deleteDocumentById)
);

export default CitizenDocsRouter;
