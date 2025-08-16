import { Router } from "express";
import { AppointmentDocumentController } from "../controllers/appointmentDocumentController";
import catchAsync from "../util/catchAsync";

const AppointmentDocumentRoutes = Router();
const appointmentDocumentController = new AppointmentDocumentController();

AppointmentDocumentRoutes.post("/", catchAsync(appointmentDocumentController.createDocument));
AppointmentDocumentRoutes.get("/", catchAsync(appointmentDocumentController.getAllDocuments));
AppointmentDocumentRoutes.get("/:id", catchAsync(appointmentDocumentController.getDocumentById));
AppointmentDocumentRoutes.put("/:id", catchAsync(appointmentDocumentController.updateDocument));
AppointmentDocumentRoutes.delete("/:id", catchAsync(appointmentDocumentController.deleteDocument));
AppointmentDocumentRoutes.get("/reference/:referenceId", catchAsync(appointmentDocumentController.getDocumentByReferenceID));

export default AppointmentDocumentRoutes;
