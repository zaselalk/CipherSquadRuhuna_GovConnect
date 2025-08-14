import { Request, Response } from "express";
import { DepartmentService } from "../services/DepartmentServices";

interface createDepartmentRequest extends Request {
  body: { name: string; link?: string };
}

export class DepartmentController {
  constructor(private departmentService = new DepartmentService()) {}

  public getAllDepartments = async (req: Request, res: Response) => {
    const departments = await this.departmentService.getAllDepartments();
    return res.status(200).json({
      message: "Departments retrieved successfully",
      status: 200,
      error: null,
      data: departments,
    });
  };

  public getDepartmentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const department = await this.departmentService.getDepartmentById(parseInt(id));
    if (!department) {
      return res.status(404).json({
        message: "Department not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Department retrieved successfully",
      status: 200,
      error: null,
      data: department,
    });
  };

  public createDepartment = async (req: createDepartmentRequest, res: Response) => {
    const department = await this.departmentService.createDepartment(req.body);
    return res.status(201).json({
      message: "Department created successfully",
      status: 201,
      error: null,
      data: department,
    });
  };

  public updateDepartment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const department = await this.departmentService.updateDepartment(parseInt(id), req.body);
    if (!department) {
      return res.status(404).json({
        message: "Department not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Department updated successfully",
      status: 200,
      error: null,
      data: department,
    });
  };

  public deleteDepartment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await this.departmentService.deleteDepartment(parseInt(id));
    if (!deleted) {
      return res.status(404).json({
        message: "Department not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Department deleted successfully",
      status: 200,
      error: null,
      data: null,
    });
  };
}
