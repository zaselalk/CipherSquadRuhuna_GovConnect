import { CitizenDocsRepository } from "../repositories/CitizenDocRepository";
import { CitizenDocAttributes, CitizenDocCreationAttributes } from "../types/citizendoc";

export class CitizenDocsService {
  constructor(private citizenDocsRepository = CitizenDocsRepository.getInstance()) {}

  public async getAllDocuments(): Promise<CitizenDocAttributes[]> {
    return await this.citizenDocsRepository.getAllDocuments();
  }

  public async getDocumentById(id: number): Promise<CitizenDocAttributes | null> {
    return await this.citizenDocsRepository.findDocumentById(id);
  }

  public async getDocumentsByCitizen(citizen_id: number): Promise<CitizenDocAttributes[]> {
    return await this.citizenDocsRepository.findDocumentsByCitizen(citizen_id);
  }

  public async uploadDocument(data: CitizenDocCreationAttributes): Promise<CitizenDocAttributes> {
    return await this.citizenDocsRepository.createDocument(data);
  }

  public async updateDocument(id: number, data: Partial<CitizenDocCreationAttributes>): Promise<CitizenDocAttributes | null> {
    return await this.citizenDocsRepository.updateDocument(id, data);
  }

  public async deleteDocument(id: number): Promise<boolean> {
    return await this.citizenDocsRepository.deleteDocument(id);
  }
}
