import { Officer } from "../models/officer";
import { OfficerRepository } from "../repositories/OfficerRepository";


export class OfficerService{
    constructor(private officerRepository =  OfficerRepository.getInstance()){}

    public async getAllOfficers(): Promise<Officer[]> {
        return await this.officerRepository.findAll();
    }

    public async getOfficerById(officerId: number): Promise<Officer | null> {
        return await this.officerRepository.findById(officerId);
    }

    public async createOfficer(data: Partial<Officer>): Promise<Officer> {
        return await this.officerRepository.create(data);
    }

    public async updateOfficer(officerId: number, data: Partial<Officer>): Promise<Officer | null> {
        return await this.officerRepository.update(officerId, data).then(([affectedCount]) => {
            if (affectedCount > 0) {
                return this.officerRepository.findById(officerId);
            }
            return null;
        });
    }

    public async deleteOfficer(officerId: number): Promise<boolean> {
        return await this.officerRepository.delete(officerId).then((affectedCount) => {
            return affectedCount > 0;
        });
    }
   public async getDepartmentByOfficer(dep_id: number): Promise<Officer[]> {
        return await this.officerRepository.findByDepartmentId(dep_id);
    }
}