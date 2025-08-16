import { Appointment } from "../models/Appoinment";
import { AppointmentDocument } from "../models/association";
// import { AppointmentDocument } from "../models/appointmentDocument";

export class AppointmentRepository {
    private static instance: AppointmentRepository;

    private constructor() { }

    public static getInstance(): AppointmentRepository {
        if (!AppointmentRepository.instance) {
            AppointmentRepository.instance = new AppointmentRepository();
        }
        return AppointmentRepository.instance;
    }

    public async createAppointment(data: Partial<Appointment>) {
        return Appointment.create(data);
    }

    public async findAllAppointments(): Promise<Appointment[]> {
        return Appointment.findAll();
    }

    public async findAppointmentById(id: string): Promise<Appointment | null> {
        return Appointment.findByPk(id);
    }

    public async updateAppointment(id: string, data: Partial<Appointment>): Promise<[number]> {
        return Appointment.update(data, { where: { id } });
    }

    public async deleteAppointment(id: string): Promise<number> {
        const appointment = await this.findAppointmentById(id);
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        return Appointment.destroy({ where: { id } });
    }

    public async findAppointmentsByUserId(userId: string): Promise<Appointment[]> {
        return Appointment.findAll({ where: { citizenId: userId } });
    }

    public async findAppointmentByReferenceID(referenceId: string): Promise<Appointment | null> {
        return Appointment.findOne({ where: { referenceId } ,
            include: [
                {
                    model: AppointmentDocument,
                    as: "documents" ,// use the alias defined in associations
                }
            ]
        });
    }

     async getAppointmentWithDocuments(referenceId: string) {
    return await Appointment.findOne({
      where: { referenceId },
      include: [
        {
          model: AppointmentDocument,
          as: "documents", // use same alias you defined in associations
        },
      ],
    });
  }
}