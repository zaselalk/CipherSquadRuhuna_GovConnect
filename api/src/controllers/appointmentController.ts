import { AppointmentService } from "../services/appointmentService";
import { Request, Response } from "express";

const appointmentService = new AppointmentService();

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
}
