import { CitizenService } from "../services/CitizenService";
import { Request, Response } from "express";
import { CitizenCreationAttributes } from "../types/citizen";

interface createCitizenRequest extends Request {
  body: CitizenCreationAttributes;
}

export class CitizenController {
  private citizenService: CitizenService;

  constructor() {
    this.citizenService = new CitizenService();
  }

  /**
   * Create a new citizen
   * @param req - The HTTP request object containing citizen data
   * @param res - The HTTP response object
   */
  registerCitizen = async (
    req: createCitizenRequest,
    res: Response
  ): Promise<Response> => {
    try {
      const citizenData = req.body;
      const result = await this.citizenService.registerCitizen(citizenData);

      return res.status(201).json({
        message: result.message,
        status: 201,
        error: null,
        data: {
          id: result.citizen.id,
          fullName: result.citizen.fullName,
          email: result.citizen.email,
          dateOfBirth: result.citizen.dateOfBirth,
          address: result.citizen.address,
          contactNumber: result.citizen.contactNumber,
          NICNumber: result.citizen.NICNumber,
          email_verified: result.citizen.email_verified,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to register citizen",
        status: 400,
        error: (error as Error).message,
        data: null,
      });
    }
  };

  /**
   * Login a citizen
   * @param req - The HTTP request object containing login credentials
   * @param res - The HTTP response object
   * @returns A response indicating success or failure of the login attempt
   */
  loginCitizen = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const result = await this.citizenService.loginCitizen(email, password);

      return res.status(200).json({
        message: "Login successful",
        status: 200,
        error: null,
        data: {
          Citizen: {
            id: result.id,
            fullName: result.fullName,
            email: result.email,
            email_verified: result.email_verified,
          },
          token: result.token,
        },
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      let statusCode = 400;

      if (errorMessage === "Citizen not found") {
        statusCode = 404;
      } else if (errorMessage === "Invalid credentials") {
        statusCode = 401;
      } else if (
        errorMessage === "Please verify your email before logging in"
      ) {
        statusCode = 403;
      }

      return res.status(statusCode).json({
        message: errorMessage,
        status: statusCode,
        error: null,
        data: null,
      });
    }
  };

  /**
   * Verify citizen email using verification token
   * @param req - The HTTP request object containing the verification token
   * @param res - The HTTP response object
   */
  verifyEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { token } = req.query;

      if (!token || typeof token !== "string") {
        return res.status(400).json({
          message: "Verification token is required",
          status: 400,
          error: null,
          data: null,
        });
      }

      const result = await this.citizenService.verifyCitizenEmail(token);

      return res.status(200).json({
        message: result.message,
        status: 200,
        error: null,
        data: {
          id: result.citizen.id,
          email: result.citizen.email,
          email_verified: result.citizen.email_verified,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
        status: 400,
        error: null,
        data: null,
      });
    }
  };

  /**
   * Resend verification email to citizen
   * @param req - The HTTP request object containing the email
   * @param res - The HTTP response object
   */
  resendVerificationEmail = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
          status: 400,
          error: null,
          data: null,
        });
      }

      const result = await this.citizenService.resendVerificationEmail(email);

      return res.status(200).json({
        message: result.message,
        status: 200,
        error: null,
        data: null,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
        status: 400,
        error: null,
        data: null,
      });
    }
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
    try {
      const { id } = req.params;
      const citizen = await this.citizenService.getCitizenById(parseInt(id));
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
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
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
    try {
      const { id } = req.params;
      const citizenData = req.body;
      const updatedCitizen = await this.citizenService.updateCitizen(
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
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
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
    try {
      const { id } = req.params;
      const deleted = await this.citizenService.deleteCitizen(parseInt(id));

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
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
  };

  /**
   * Get all citizens
   * @param req - The HTTP request object
   * @param res - The HTTP response object
   */
  getAllCitizens = async (req: Request, res: Response): Promise<Response> => {
    try {
      const citizens = await this.citizenService.getAllCitizens();
      return res.status(200).json({
        message: "Citizens retrieved successfully",
        status: 200,
        error: null,
        data: citizens,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
        error: (error as Error).message,
        data: null,
      });
    }
  };
}

/***
 * Note for Developers: This controller is responsible for handling requests related to citizens,
 * But the methods are not handling errors instead they are returning the error messages directly
 * which are coming from the repository methods. Error are expected to handle by
 * catchAsyncError in the routes.
 */
