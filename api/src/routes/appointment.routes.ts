import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";
import { AppointmentService } from "../services/appointmentService";
import catchAsync from "../util/catchAsync";

const AppointmentRoutes = Router();

const appointmentController = new AppointmentController();

AppointmentRoutes.get("/", catchAsync(appointmentController.getAll));
AppointmentRoutes.get("/:id", catchAsync(appointmentController.getById));
AppointmentRoutes.post("/", catchAsync(appointmentController.create));
AppointmentRoutes.put("/:id", catchAsync(appointmentController.update));
AppointmentRoutes.delete("/:id", catchAsync(appointmentController.delete));
AppointmentRoutes.get("/user/:userId", catchAsync(appointmentController.getByUserId));
AppointmentRoutes.get("/reference/:referenceId", catchAsync(appointmentController.getByReferenceID));
AppointmentRoutes.get("/documents/:referenceId", catchAsync(appointmentController.getAppointmentWithDocuments));
AppointmentRoutes.post("/with-documents", catchAsync(appointmentController.createAppointmentWithDocuments));

export default AppointmentRoutes;
