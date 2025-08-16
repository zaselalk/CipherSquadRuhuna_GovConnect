import { DepartmentServiceService } from "../services/DerpartmentServiceService";
import { Request, Response } from "express";
import { stat } from "fs";

export class DepartmentServiceController {
  constructor(
    private departmentServiceService = new DepartmentServiceService()
  ) {}

  public createService = async (req: Request, res: Response) => {
    try {
      const service = await this.departmentServiceService.createService(
        req.body
      );
      res.status(201).json({
        message: "Service created successfully",
        status: 201,
        error: null,
        data: service,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Service creation failed",
        status: 500,
        error: error.message,
        data: null,
      });
    }
  };

  public getServiceById = async (req: Request, res: Response) => {
    try {
      const service = await this.departmentServiceService.getServiceById(
        Number(req.params.id)
      );
      if (!service) {
        res.status(404).json({
          message: "Service not found",
          status: 404,
          error: null,
          data: null,
        });
        return;
      }
      res.status(200).json({
        message: "Service retrieved successfully",
        status: 200,
        error: null,
        data: service,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to retrieve service",
        status: 500,
        error: error.message,
        data: null,
      });
    }
  };

  public getAllServices = async (req: Request, res: Response) => {
    try {
      const services = await this.departmentServiceService.getAllServices();
      res.status(200).json({
        message: "Services retrieved successfully",
        status: 200,
        error: null,
        data: services,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to retrieve services",
        status: 500,
        error: error.message,
        data: null,
      });
    }
  };

  public updateService = async (req: Request, res: Response) => {
    try {
      const service = await this.departmentServiceService.updateService(
        Number(req.params.id),
        req.body
      );
      if (!service) {
        res.status(404).json({
          message: "Service not found",
          status: 404,
          error: null,
          data: null,
        });
        return;
      }
      res.status(200).json({
        message: "Service updated successfully",
        status: 200,
        error: null,
        data: service,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to update service",
        status: 500,
        error: error.message,
        data: null,
      });
    }
  };

  public deleteService = async (req: Request, res: Response) => {
    try {
      const result = await this.departmentServiceService.deleteService(
        Number(req.params.id)
      );
      if (result === 0) {
        res.status(404).json({
          message: "Service not found",
          status: 404,
          error: null,
          data: null,
        });
        return;
      }
      res.status(204).send({
        message: "Service deleted successfully",
        status: 204,
        error: null,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to delete service",
        status: 500,
        error: error.message,
        data: null,
      });
    }
  };
}
