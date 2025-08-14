import { Department } from "../models/department";

export class DepartmentRepository {
  private static instance: DepartmentRepository;

  private constructor() {}

  public static getInstance(): DepartmentRepository {
    if (!DepartmentRepository.instance) {
      DepartmentRepository.instance = new DepartmentRepository();
    }
    return DepartmentRepository.instance;
  }

  public async getAllDepartments(): Promise<Department[]> {
    try {
      return await Department.findAll();
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw new Error("Failed to retrieve departments");
    }
  }

  public async findDepartmentById(dep_id: number): Promise<Department | null> {
    try {
      return await Department.findByPk(dep_id);
    } catch (error) {
      console.error("Error finding department:", error);
      throw new Error("Failed to find department");
    }
  }

  public async createDepartment(data: Partial<Department>): Promise<Department> {
    try {
      return await Department.create(data);
    } catch (error) {
      console.error("Error creating department:", error);
      throw new Error("Failed to create department");
    }
  }

  public async updateDepartment(dep_id: number, data: Partial<Department>): Promise<Department | null> {
    const dept = await this.findDepartmentById(dep_id);
    if (!dept) return null;
    await dept.update(data);
    return dept;
  }

  public async deleteDepartment(dep_id: number): Promise<boolean> {
    const dept = await this.findDepartmentById(dep_id);
    if (!dept) return false;
    await dept.destroy();
    return true;
  }
}
