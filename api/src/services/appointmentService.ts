
import { AppointmentRepository } from '../repositories/appointmentRepository';

export class AppointmentService {
    constructor(private appointmentRepository = AppointmentRepository.getInstance()) {}

    async createAppointment(data: any) {
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
}
