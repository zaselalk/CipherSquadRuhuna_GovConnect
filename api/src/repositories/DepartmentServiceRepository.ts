import { DepartmentService } from "../models/department-service";


export class DepartmentServiceRepository {
  private static instance: DepartmentServiceRepository;
  
  private constructor() {}

  static getInstance(): DepartmentServiceRepository {
    if (!DepartmentServiceRepository.instance) {
      DepartmentServiceRepository.instance = new DepartmentServiceRepository();
    }
    return DepartmentServiceRepository.instance;
  }

  public async createService(data: Partial<DepartmentService>): Promise<DepartmentService> {
    return DepartmentService.create(data);
  }

  public async getServiceById(id: number): Promise<DepartmentService | null> {
    return DepartmentService.findByPk(id);
  }

  public async updateService(id: number, data: Partial<DepartmentService>): Promise<DepartmentService | null> {
    const service = await this.getServiceById(id);
    if (!service) return null;

    return service.update(data);
  }

  public async deleteService(id: number): Promise<number> {
    return DepartmentService.destroy({
      where: { service_id: id },
    });
  }
}
