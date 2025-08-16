import { Request, Response } from "express";
import { OfficerService } from "../services/OfficerService";
import { OfficerCreationAttributes } from "../types/officer";


interface CreateOfficerRequest extends Request {
  body: OfficerCreationAttributes;
}

export class OfficerController {
  private officerService: OfficerService;

  constructor() {
    this.officerService = new OfficerService();
  }

  /**
   * Create a new officer (assign a user to a department)
   */
  createOfficer = async (
    req: CreateOfficerRequest,
    res: Response
  ): Promise<Response> => {
    try {
      const { officer_id, department_id } = req.body;

      if (!officer_id || !department_id) {
        return res.status(400).json({
          message: "officer_id and department_id are required",
          status: 400,
          error: null,
          data: null,
        });
      }

      const officer = await this.officerService.createOfficer({
        officer_id: Number(officer_id),
        dep_id: Number(department_id),
      });

      return res.status(201).json({
        message: "Officer assigned successfully",
        status: 201,
        error: null,
        data: officer,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to create officer",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
  };

  /**
   * Get all officers
   */
  getAllOfficers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const officers = await this.officerService.getAllOfficers();
      return res.status(200).json({
        message: "Officers retrieved successfully",
        status: 200,
        error: null,
        data: officers,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch officers",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
  };

  /**
   * Get officer by ID
   */
  getOfficerById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const officer = await this.officerService.getOfficerById(
        Number(req.params.id)
      );

      if (!officer) {
        return res.status(404).json({
          message: "Officer not found",
          status: 404,
          error: null,
          data: null,
        });
      }

      return res.status(200).json({
        message: "Officer retrieved successfully",
        status: 200,
        error: null,
        data: officer,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch officer",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
  };

  /**
   * Update officer data
   */
  updateOfficer = async (req: CreateOfficerRequest, res: Response) => {
    try {
      const updatedOfficer = await this.officerService.updateOfficer(
        Number(req.params.id),
        req.body
      );

      if (!updatedOfficer) {
        return res.status(404).json({
          message: "Officer not found",
          status: 404,
          error: null,
          data: null,
        });
      }

      return res.status(200).json({
        message: "Officer updated successfully",
        status: 200,
        error: null,
        data: updatedOfficer,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to update officer",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
  };

  /**
   * Delete officer
   */
  deleteOfficer = async (req: Request, res: Response) => {
    try {
      const success = await this.officerService.deleteOfficer(
        Number(req.params.id)
      );

      if (!success) {
        return res.status(404).json({
          message: "Officer not found",
          status: 404,
          error: null,
          data: null,
        });
      }

      return res.status(200).json({
        message: "Officer deleted successfully",
        status: 200,
        error: null,
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete officer",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
  };

  /**
   * Get all officers in a department
   */
  getOfficersByDepartment = async (req: Request, res: Response) => {
    try {
      const officers = await this.officerService.getOfficersByDepartment(
        Number(req.params.dep_id)
      );

      return res.status(200).json({
        message: "Officers retrieved successfully",
        status: 200,
        error: null,
        data: officers,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch officers by department",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
  };
}
