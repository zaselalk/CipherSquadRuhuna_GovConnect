import sequelize from "../models/sequelize";
import { AppointmentDocumentService } from "../services/appointmentDocumentService";
import { AppointmentService } from "../services/appointmentService";
import { Request, Response } from "express";

const appointmentService = new AppointmentService();
const appointmentDocumentService = new AppointmentDocumentService();

export class AppointmentController {
  public async create(req: Request, res: Response) {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  }

  public async getAll(req: Request, res: Response) {
    const appointments = await appointmentService.getAllAppointments();
    res.json(appointments);
  }

  public async getById(req: Request, res: Response) {
    const appointment = await appointmentService.getAppointmentById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.json(appointment);
  }

  public async update(req: Request, res: Response) {
    await appointmentService.updateAppointment((req.params.id), req.body);
    res.json({ message: "Updated successfully" });
  }

  public async delete(req: Request, res: Response) {
    await appointmentService.deleteAppointment(req.params.id);
    res.json({ message: "Deleted successfully" });
  }

  // Get appointments by user ID
  public async getByUserId(req: Request, res: Response) {
    const appointments = await appointmentService.getAppointmentsByUserId(req.params.userId);
    res.json(appointments);
  }

  // Get appointment by reference ID
  public async getByReferenceID(req: Request, res: Response) {
    const appointment = await appointmentService.getAppointmentByReferenceID(req.params.referenceId);
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.json(appointment);
  }


  public async getAppointmentWithDocuments(req: Request, res: Response) {
    const { referenceId } = req.params;
    const appointment = await appointmentService.getAppointmentWithDocuments(referenceId);
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.json(appointment);
  }

  public async createAppointmentWithDocuments(req: Request, res: Response) {
    // const t = await appointmentService.sequelize.transaction(); // Start transaction
    const t = await sequelize.transaction();
    try {
      // 1️⃣ Save Appointment
      const { citizenId, serviceId, appointmentDate, appointmentTime } = req.body;

      console.log("Request body:", req.body);
      console.log("Files:", req.files);
      const appointment = await appointmentService.createAppointment(
        {
          citizenId,
          serviceId,
          appointmentDate,
          appointmentTime,
          referenceId: `REF-${Date.now()}` // Generate unique reference
        },
        { transaction: t }
      );

      // 2️⃣ Save Appointment Documents
      const files = req.files as Express.Multer.File[];
      let documents: any[] = [];

      if (files && files.length > 0) {
        documents = await Promise.all(
          files.map((file) =>
            appointmentDocumentService.createDocument(
              {
                appointmentReferenceId: appointment.referenceId,
                citizenId: citizenId,
                documentId: req.body.documentId, // you may pass doc type id from body
                fileName: file.originalname,
                filePath: file.path,
                mimeType: file.mimetype,
              },
              { transaction: t }
            )
          )
        );
      }

      // 3️⃣ Commit Transaction
      await t.commit();

      return res.status(201).json({
        message: "Appointment with documents created successfully",
        status: 201,
        error: null,
        data: {
          appointment,
          documents,
        },
      });
    } catch (error) {
      await t.rollback();
      console.error(error);
      return res.status(500).json({
        message: "Failed to create appointment with documents",
        status: 500,
        error,
        data: null,
      });
    }
  }

}
