import { AppointmentDocumentRepository } from "../repositories/appointmentDocumentRepository";


export class AppointmentDocumentService {
 constructor(private appointmentDocumentRepository = AppointmentDocumentRepository.getInstance()) {}

 async createDocument(data: any, p0?: { transaction: any; }) {
   return this.appointmentDocumentRepository.createDocument(data);
 }

 async getAllDocuments() {
   return this.appointmentDocumentRepository.getAllDocuments();
 }

 async getDocumentById(id: number) {
   return this.appointmentDocumentRepository.findDocumentById(id);
 }

 async updateDocument(id: number, data: any) {
   return this.appointmentDocumentRepository.updateDocument(id, data);
 }

 async deleteDocument(id: number) {
   return this.appointmentDocumentRepository.deleteDocument(id);
 }

  async getDocumentByReferenceID(referenceId: string) {
    return this.appointmentDocumentRepository.findDocumentsByReferenceID(referenceId);
  }
 
}
