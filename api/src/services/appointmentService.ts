
import { AppointmentRepository } from '../repositories/appointmentRepository';

export class AppointmentService {
    [x: string]: any;
    constructor(private appointmentRepository = AppointmentRepository.getInstance()) {}

    async createAppointment(data: any, p0?: { transaction: any; }) {
        return this.appointmentRepository.createAppointment(data);
    }

    async getAllAppointments() {
        return this.appointmentRepository.findAllAppointments();
    }

    async getAppointmentById(id: string) {
        return this.appointmentRepository.findAppointmentById(id);
    }

    async updateAppointment(id: string, data: any) {
        return this.appointmentRepository.updateAppointment(id, data);
    }

    async deleteAppointment(id: string) {
        return this.appointmentRepository.deleteAppointment(id);
    }

    async getAppointmentsByUserId(userId: string) {
        return this.appointmentRepository.findAppointmentsByUserId(userId);
    }

    async getAppointmentByReferenceID(referenceId: string) {
        return this.appointmentRepository.findAppointmentByReferenceID(referenceId);
    }

    async getAppointmentWithDocuments(referenceId: string) {
        return this.appointmentRepository.getAppointmentWithDocuments(referenceId);
    }
}

