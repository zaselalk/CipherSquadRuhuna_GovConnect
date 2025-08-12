import { Request, Response } from "express";
import { Resident } from "../models/resident";
import { ResidentService } from "../services/ResidentService";
import { ResidentRepository } from "../repositories/ResidentRepository";
import jwt from "jsonwebtoken";
import { ResidentClinicService } from "../services/ResidentClinicService";
import { ResidentClinicRepository } from "../repositories/ResidentClinicRepository";

class ResidentController {
  private residentService: ResidentService;
  private residentClinicService: ResidentClinicService;

  constructor() {
    const residentRepository = new ResidentRepository();
    this.residentService = new ResidentService(residentRepository);
    const residentClinicRepository = new ResidentClinicRepository();
    this.residentClinicService = new ResidentClinicService(
      residentClinicRepository
    );
  }

  residentPing = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    return res.json({
      message: "Resident ping",
    });
  };

  residentRegister = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const {
      firstName,
      lastName,
      nic,
      email,
      password,
      birthday,
      bloodGroup,
      gender,
      bloodPressure,
      heartRate,
      address,
      contactNumber,
      divisionId,
      maritalState,
      educationLevel,
      addicted,
      alergies,
      chronicalDesease,
      height,
      weight,
      clinic,
      Birthcertificate,
      religion,
      jobdetail,
      glucose,
      deletedAt,
    } = req.body;

    const residentfindByNic: Resident | null =
      await this.residentService.findByNic(nic);

    if (residentfindByNic) {
      return res.status(400).json({
        message: "Resident already exists",
        status: 400,
        error: "Resident already exists",
        data: null,
      });
    } else if (residentfindByNic === null) {
      const resident = await this.residentService.registerResident(
        firstName,
        lastName,
        nic,
        email,
        password,
        birthday,
        bloodGroup,
        gender,
        bloodPressure,
        heartRate,
        address,
        contactNumber,
        divisionId,
        maritalState,
        educationLevel,
        addicted,
        alergies,
        chronicalDesease,
        height,
        weight,
        Birthcertificate,
        religion,
        jobdetail,
        glucose,
        deletedAt
      );

      const residentId = resident.id;

      // Register resident with multiple clinics
      const residentClinics = await Promise.all(
        clinic.map(async (clinicId: number) => {
          return await this.residentClinicService.createResidentClinic(
            Number(residentId),
            Number(clinicId)
          );
        })
      );
      

      return res.json({
        message: "Resident registered successfully",
        status: 200,
        error: null,
        data: resident,
      });
    }
  };
  residentfindByNic = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { nic } = req.params;
    const resident = await this.residentService.findByNic(nic);
    if (!resident) {
      return res.status(404).json({
        message: null,
        status: 404,
        error: "Resident not found",
        data: null,
      });
    }
    return res.json({
      message: "Resident found",
      status: 200,
      error: null,
      data: resident,
    });
  };

  residentfindById = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const resident = await this.residentService.findById(Number(id));
    if (!resident) {
      return res.status(404).json({
        message: null,
        status: 404,
        error: "Resident not found",
        data: null,
      });
    }
    return res.json({
      message: "Resident found",
      status: 200,
      error: null,
      data: resident,
    });
  };

  getAllResident = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const residents = await this.residentService.getAllResident();
    if (!residents) {
      return res.status(404).json({
        message: null,
        status: 404,
        error: "Resident not found",
        data: null,
      });
    } else {
      res.status(200).json({
        message: "Resident found",
        status: 200,
        error: null,
        data: residents,
      });
    }
  };

  updateResident = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: null,
          status: 400,
          error: "Resident Not Found",
          data: null,
        });
      }

      const updateData = req.body;
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: null,
          status: 400,
          error: "No update data provided",
          data: null,
        });
      }

      const updatedResident = await this.residentService.updateResident(
        id,
        updateData
      );

      if (!updatedResident) {
        return res.status(404).json({
          message: null,
          status: 404,
          error: "Not Update",
          data: null,
        });
      }
      return res.json({
        message: "Resident updated successfully",
        status: 200,
        error: null,
        data: updatedResident,
      });
    } catch (error) {
      console.error("Update Error:", error);
      return res.status(500).json({
        message: null,
        status: 500,
        error: "Error updating resident",
        data: null,
      });
    }
  };

  deleteResidentById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          message: null,
          status: 400,
          error: "Invalid ID provided",
          data: null,
        });
      }

      const deleted = await this.residentService.deleteResident(id);

      if (!deleted) {
        return res.status(404).json({
          message: null,
          status: 404,
          error: "Resident not found",
          data: null,
        });
      }

      return res.json({
        message: "Resident deleted successfully",
        status: 200,
        error: null,
        data: deleted,
      });
    } catch (error) {
      return res.status(500).json({
        message: null,
        status: 500,
        error: "Error deleting resident",
        data: null,
      });
    }
  };

  getResidentOverview = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const residentOverview = await this.residentService.getResidentOverview();
    if (!residentOverview) {
      return res.status(404).json({
        message: null,
        status: 404,
        error: "Resident not found",
        data: null,
      });
    } else {
      res.status(200).json({
        message: "Resident found",
        status: 200,
        error: null,
        data: residentOverview,
      });
    }
  };

  getResidentCount = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    try {
      const count = await this.residentService.getResidentCount();
      res.status(200).json({
        message: "Resident count fetched successfully",
        status: 200,
        error: null,
        data: { count },
      });
    } catch (error) {
      console.error("Error fetching resident count:", error);
      res.status(500).json({
        message: null,
        status: 500,
        error: "Internal server error",
        data: null,
      });
    }
  };

  getDiseasePatientCounts = async (req: Request, res: Response) => {
    try {
      const counts = await this.residentService.getDiseasePatientCounts();
      res.status(200).json(counts);
    } catch (error) {
      res.status(500).json({ message: "Error counting diseases" });
    }
  };

 getResidentCountByDivision = async (req: Request, res: Response) => {
  try {
    const { divisionId } = req.params;
    const count = await Resident.count({
      where: { divisionId: divisionId },
    });
    res.status(200).json({ divisionId, residentCount: count });
  } catch (error) {
    console.error("Error fetching resident count by division:", error);
    res.status(500).json({ error: "Failed to fetch resident count" });
  }
};

  loginResidentByEmailandPassword = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { email, password } = req.body;

    try {
      const resident =
        await this.residentService.loginResidentByEmailandPassword(
          email,
          password
        );

      if (!resident) {
        return res.status(404).json({
          message: null,
          status: 404,
          error: "Resident not found",
          data: null,
        });
      }

      const token = jwt.sign(
        { id: resident.id, email: resident.email },
        process.env.JWT_SECRET || "defaultsecret",
        {
          expiresIn: "1h", // Token expiration time
        }
      );

      return res.json({
        message: "Resident logged in successfully",
        status: 200,
        error: null,
        token: token,
        data: resident,
      });
    } catch (error: any) {
      console.error("Login Error:", error);

      // if resident not found, it send resident not found
      if (error.message === "Resident not found") {
        return res.status(404).json({
          message: null,
          status: 404,
          error: "Resident not found",
          data: null,
        });
      }

      // if password is incorrect, it send invalid credentials
      if (error.message === "Invalid password") {
        return res.status(401).json({
          message: null,
          status: 401,
          error: "Invalid credentials",
          data: null,
        });
      }

      return res.status(500).json({
        message: null,
        status: 500,
        error: "Error logging in resident",
        data: null,
      });
    }
  };

}

export default ResidentController;
