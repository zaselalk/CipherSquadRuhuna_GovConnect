import Resident from "../models/resident";
import ResidentDisease from "../models/residentdisease";
import { ResidentDiseaseRepository } from "../repositories/ResidentDiseaseRepository";


export class ResidentDiseaseService {
    private residentDiseaseRepository: ResidentDiseaseRepository;

    constructor(residentDiseaseRepository: ResidentDiseaseRepository) {
        this.residentDiseaseRepository = residentDiseaseRepository;
    }

    // Register a resident with a disease
    async createResidentDisease(
        residentId: number,
        diseaseId: number
    ): Promise<ResidentDisease> {
        return await this.residentDiseaseRepository.createResidentDisease(residentId, diseaseId);
    }

    // Get all resident-disease links
    async getAllResidentDiseases(): Promise<ResidentDisease[]> {
        return await this.residentDiseaseRepository.getAllResidentDiseases();
    }

    // Delete by diseaseId
    async deleteByDiseaseId(diseaseId: number): Promise<void> {
        return await this.residentDiseaseRepository.deleteResidentDiseaseByDiseaseId(diseaseId);
    }

    // Delete by residentId
    async deleteByResidentId(residentId: number): Promise<void> {
        return await this.residentDiseaseRepository.deleteResidentDiseaseByResidentId(residentId);
    }

    // Get diseases by residentId (used for profile view or diagnosis view)
    async getDiseasesByResidentId(residentId: number): Promise<{ diseaseId: number; name: string }[]> {
        return await this.residentDiseaseRepository.getDiseasesByResidentId(residentId);
    }

    // Get residents by diseaseId (used for outbreak view or filter)
    async getResidentsByDiseaseId(diseaseId: number): Promise<{ id: number; firstName: string; lastName: string; contactNumber: string }[]> {
        return await this.residentDiseaseRepository.getResidentsByDiseaseId(diseaseId);
    }

    // Get all diseases by diseasename 
    async getDivisionCountsByDiseaseName(diseaseName: string): Promise<{ division: string, count: number }[]> {
        console.log(" Service received diseaseName:", diseaseName);
        const data = await this.residentDiseaseRepository.getDivisionCountsByDiseaseName(diseaseName);
        console.log("Service got division data:", data);
        return data;
    }

    //getPatientsCountbyDID
    async getPatientsCountByDiseaseId(diseaseId: number): Promise<number> {
        try {
            const count = await this.residentDiseaseRepository.getPatientsCountByDiseaseId(diseaseId);
            return count;
        } catch (error) {
            console.error("Error fetching patient count by disease ID:", error);
            throw new Error("Unable to fetch patient count by disease ID");
        }
    }

  // Get disease counts by division
async getDiseaseCountsByDivision(divisionId: number): Promise<{ name: string; count: number }[]> {
  return this.residentDiseaseRepository.getDiseaseCountsByDivision(divisionId);
}

}

