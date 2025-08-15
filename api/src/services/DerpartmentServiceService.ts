import { DepartmentService } from "../models/department-service";
import { DepartmentServiceRepository } from "../repositories/DepartmentServiceRepository";

export class DepartmentServiceService {
  constructor(private departmentServiceRepository = DepartmentServiceRepository.getInstance()) { }

  public async createService(data: Partial<DepartmentService>): Promise<DepartmentService> {
    return await this.departmentServiceRepository.createService(data);
  }

  public async getServiceById(id: number): Promise<DepartmentService | null> {
    return await this.departmentServiceRepository.getServiceById(id);
  }

  public async getAllServices(): Promise<DepartmentService[]> {
    return await this.departmentServiceRepository.getAllServices();
  }

  public async updateService(id: number, data: Partial<DepartmentService>): Promise<DepartmentService | null> {
    return await this.departmentServiceRepository.updateService(id, data);
  }

  public async deleteService(id: number): Promise<number> {
    return await this.departmentServiceRepository.deleteService(id);
  }
}
