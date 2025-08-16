import { Appointment, AppointmentDocument, Citizen } from "../models/association";
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


  async createAppointmentWithDocuments(req: Request, res: Response) {
    try {
      const { citizenId, serviceId, appointmentDate, appointmentTime, referenceId } = req.body;

      

      const appointment = await Appointment.create({
        citizenId,
        serviceId,
        appointmentDate,
        appointmentTime,
        referenceId, // null නොවී save වෙනවා
      });

      // File upload තියෙනවද බලන්න
      if (Array.isArray(req.files) && req.files.length > 0) {
        const docs = req.files.map((file) => ({
          appointmentId: appointment.appointmentId,
          fileName: file.originalname,
          filePath: file.path,
          mimeType: file.mimetype,
        }));

        await AppointmentDocument.bulkCreate(docs);
      }

      res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        appointment,
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ error: "Failed to create appointment" });
    }

  };


}
function uuidv4() {
  throw new Error("Function not implemented.");
}

