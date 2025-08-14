import { DepartmentRepository } from "../repositories/DepartmentRepository";
import { Department } from "../models/department";

export class DepartmentService {
  constructor(private departmentRepository = DepartmentRepository.getInstance()) {}

  public async getAllDepartments(): Promise<Department[]> {
    return await this.departmentRepository.getAllDepartments();
  }

  public async getDepartmentById(dep_id: number): Promise<Department | null> {
    return await this.departmentRepository.findDepartmentById(dep_id);
  }

  public async createDepartment(data: Partial<Department>): Promise<Department> {
    return await this.departmentRepository.createDepartment(data);
  }

  public async updateDepartment(dep_id: number, data: Partial<Department>): Promise<Department | null> {
    return await this.departmentRepository.updateDepartment(dep_id, data);
  }

  public async deleteDepartment(dep_id: number): Promise<boolean> {
    return await this.departmentRepository.deleteDepartment(dep_id);
  }
}
