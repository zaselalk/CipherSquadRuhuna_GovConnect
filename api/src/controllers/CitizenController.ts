import { CitizenRepository } from "../repositories/CitizenRepository";
import { Request, Response } from "express";
import { CitizenCreationAttributes } from "../types/citizen";
import { Citizen } from "../models/citizen";

interface createCitizenRequest extends Request {
  body: CitizenCreationAttributes;
}

export class CitizenController {
  constructor(private citizenRepository = CitizenRepository.getInstance()) {}

  /**
   * Create a new citizen
   * @param req - The HTTP request object containing citizen data
   * @param res - The HTTP response object
   */
  registerCitizen = async (
    req: createCitizenRequest,
    res: Response
  ): Promise<Response> => {
    const citizenData = req.body;
    const citizen = await this.citizenRepository.createCitizen(citizenData);

    return res.status(201).json({
      message: "Citizen created successfully",
      status: 201,
      error: null,
      data: {
        id: citizen.id,
        fullName: citizen.fullName,
        email: citizen.email,
        dateOfBirth: citizen.dateOfBirth,
        address: citizen.address,
        contactNumber: citizen.contactNumber,
        NICNumber: citizen.NICNumber,
      },
    });
  };

  /**
   * Login a citizen
   * @param req - The HTTP request object containing login credentials
   * @param res - The HTTP response object
   * @returns A response indicating success or failure of the login attempt
   */
  loginCitizen = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    // Implement login logic here, e.g., verify credentials

    // find the user by email
    const citizen = await this.citizenRepository.findCitizenByEmail(email);
    if (!citizen) {
      return res.status(404).json({
        message: "Citizen not found",
        status: 404,
        error: null,
        data: null,
      });
    }

    const isValidPassword = await citizen.validatePassword(
      password,
      citizen.password
    );

    // Check password (this is a placeholder, implement your own logic)
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
        status: 401,
        error: null,
        data: null,
      });
    }

    const token = await citizen.generateToken();
    // If login is successful, return citizen data (excluding password)
    return res.status(200).json({
      message: "Login successful",
      status: 200,
      error: null,
      data: {
        Citizen: {
          id: citizen.id,
          fullName: citizen.fullName,
          email: citizen.email,
          dateOfBirth: citizen.dateOfBirth,
          address: citizen.address,
          contactNumber: citizen.contactNumber,
          NICNumber: citizen.NICNumber,
        },
        token,
      },
    });
  };

  /**
   * Check if citizen token is valid
   * @param req - The HTTP request object (token should be in headers)
   * @param res - The HTTP response object
   * @returns A response with citizen data if token is valid
   */
  checkToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      // The token should be validated by middleware and citizen data attached to req
      const citizen = (req as any).citizen; // Assuming middleware adds citizen to request

      if (!citizen) {
        return res.status(401).json({
          message: "Invalid or expired token",
          status: 401,
          error: null,
          data: null,
        });
      }

      return res.status(200).json({
        message: "Token is valid",
        status: 200,
        error: null,
        data: {
          id: citizen.id,
          fullName: citizen.fullName,
          email: citizen.email,
          dateOfBirth: citizen.dateOfBirth,
          address: citizen.address,
          contactNumber: citizen.contactNumber,
          NICNumber: citizen.NICNumber,
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired token",
        status: 401,
        error: null,
        data: null,
      });
    }
  };

  /**
   * Find a citizen by ID
   * @param req - The HTTP request object containing the citizen ID
   * @param res - The HTTP response object
   */
  findCitizenById = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const citizen = await this.citizenRepository.findCitizenById(parseInt(id));
    if (!citizen) {
      return res.status(404).json({
        message: "Citizen not found",
        status: 404,
        error: null,
        data: null,
      });
    }
    return res.status(200).json({
      message: "Citizen found",
      status: 200,
      error: null,
      data: citizen,
    });
  };

  /**
   * Update a citizen by ID
   * @param req - The HTTP request object containing the citizen ID and data to update
   * @param res - The HTTP response object
   */
  updateCitizenById = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const citizenData = req.body;
    const updatedCitizen = await this.citizenRepository.updateCitizenById(
      parseInt(id),
      citizenData
    );

    if (!updatedCitizen) {
      return res.status(404).json({
        message: "Citizen not found",
        status: 404,
        error: null,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Citizen updated successfully",
      status: 200,
      error: null,
      data: updatedCitizen,
    });
  };

  /**
   * Delete a citizen by ID
   * @param req - The HTTP request object containing the citizen ID
   * @param res - The HTTP response object
   */
  deleteCitizenById = async (
    req: Request,
    res: Response
  ): Promise<Response | void> => {
    const { id } = req.params;
    const deleted = await this.citizenRepository.deleteCitizenById(
      parseInt(id)
    );

    if (!deleted) {
      return res.status(404).json({
        message: "Citizen not found",
        status: 404,
        error: null,
        data: null,
      });
    }

    return res.status(200).json({
      message: "Citizen deleted successfully",
      status: 200,
      error: null,
      data: null,
    });
  };

  /**
   * Get all citizens
   * @param req - The HTTP request object
   * @param res - The HTTP response object
   */
  getAllCitizens = async (req: Request, res: Response): Promise<Response> => {
    const citizens = await this.citizenRepository.getAllCitizens();
    return res.status(200).json({
      message: "Citizens retrieved successfully",
      status: 200,
      error: null,
      data: citizens,
    });
  };
}

/***
 * Note for Developers: This controller is responsible for handling requests related to citizens,
 * But the methods are not handling errors instead they are returning the error messages directly
 * which are coming from the repository methods. Error are expected to handle by
 * catchAsyncError in the routes.
 */
