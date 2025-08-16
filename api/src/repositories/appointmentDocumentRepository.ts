import { AppointmentDocument } from "../models/appointmentDocument";


export class AppointmentDocumentRepository {
  private static instance: AppointmentDocumentRepository;

  private constructor() { }


  public static getInstance(): AppointmentDocumentRepository {
    if (!AppointmentDocumentRepository.instance) {
      AppointmentDocumentRepository.instance = new AppointmentDocumentRepository();
    }
    return AppointmentDocumentRepository.instance;
  }

  public getAllDocuments(): Promise<AppointmentDocument[]> {
    return AppointmentDocument.findAll();
  }

  public async createDocument(data: Partial<AppointmentDocument>): Promise<AppointmentDocument> {
    return AppointmentDocument.create(data);
  }

  public async findDocumentById(id: number): Promise<AppointmentDocument | null> {
    return AppointmentDocument.findByPk(id);
  }

  public async updateDocument(id: number, data: Partial<AppointmentDocument>): Promise<AppointmentDocument | null> {
    const document = await AppointmentDocument.findByPk(id);
    if (document) {
      return document.update(data);
    }
    return null;
  }

  public async deleteDocument(id: number): Promise<boolean> {
    const document = await AppointmentDocument.findByPk(id);
    if (document) {
      await document.destroy();
      return true;
    }
    return false;
  }

}
