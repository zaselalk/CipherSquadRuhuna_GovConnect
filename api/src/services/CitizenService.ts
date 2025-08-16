import { CitizenRepository } from "../repositories/CitizenRepository";
import { CitizenCreationAttributes } from "../types/citizen";
import { Citizen } from "../models/citizen";
import { EmailService } from "./EmailService";

/**
 * Interface representing a logged-in citizen with basic details.
 */
interface LoginCitizen {
  id: number;
  fullName: string;
  email: string;
  token: string;
  email_verified: boolean;
}

/**
 * Service class for managing citizen-related operations.
 */
export class CitizenService {
  private citizenRepository: CitizenRepository;
  private emailService: EmailService;

  constructor() {
    this.citizenRepository = CitizenRepository.getInstance();
    this.emailService = new EmailService();
  }

  /**
   * Register a new citizen with email verification
   * @param citizenData - The citizen registration data
   * @returns The created citizen with verification email sent
   */
  public async registerCitizen(
    citizenData: CitizenCreationAttributes
  ): Promise<{
    citizen: Citizen;
    message: string;
  }> {
    try {
      // Check if citizen already exists
      const existingCitizen = await this.citizenRepository.findCitizenByEmail(
        citizenData.email
      );

      if (existingCitizen) {
        throw new Error("Citizen with this email already exists");
      }

      // Generate verification token and expiry
      const verificationToken = this.emailService.generateVerificationToken();
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Create citizen with email verification fields
      // Note: Password hashing is handled by the model's beforeCreate hook
      const newCitizenData = {
        ...citizenData,
        email_verified: false,
        email_verification_token: verificationToken,
        email_verification_expires: verificationExpires,
      };

      const citizen = await this.citizenRepository.createCitizen(
        newCitizenData
      );

      // Send verification email
      await this.emailService.sendVerificationEmail(
        citizenData.email,
        citizenData.fullName,
        verificationToken
      );

      return {
        citizen,
        message:
          "Citizen registered successfully. Please check your email for verification instructions.",
      };
    } catch (error) {
      console.error("Error in registerCitizen:", error);
      throw error;
    }
  }

  /**
   * Login a citizen
   * @param email - The citizen's email
   * @param password - The citizen's password
   * @returns The login result with token
   */
  public async loginCitizen(
    email: string,
    password: string
  ): Promise<LoginCitizen> {
    try {
      // Find citizen by email
      const citizen = await this.citizenRepository.findCitizenByEmail(email);
      if (!citizen) {
        throw new Error("Citizen not found");
      }
      // Validate password
      const isValidPassword = await citizen.validatePassword(password);
      if (!isValidPassword) {
        throw new Error("Invalid credentials");
      }

      // Check if email is verified
      if (!citizen.email_verified) {
        throw new Error("Please verify your email before logging in");
      }

      // Generate token
      const token = await citizen.generateToken();

      return {
        id: citizen.id,
        fullName: citizen.fullName,
        email: citizen.email,
        token,
        email_verified: citizen.email_verified,
      };
    } catch (error) {
      console.error("Error in loginCitizen:", error);
      throw error;
    }
  }

  /**
   * Verify citizen email using verification token
   * @param token - The verification token
   * @returns Success message
   */
  public async verifyCitizenEmail(
    token: string
  ): Promise<{ message: string; citizen: Citizen }> {
    try {
      // Find citizen by verification token
      const citizen =
        await this.citizenRepository.findCitizenByVerificationToken(token);
      if (!citizen) {
        throw new Error("Invalid or expired verification token");
      }

      // Verify the email
      const verifiedCitizen = await this.citizenRepository.verifyCitizenEmail(
        citizen.id
      );
      if (!verifiedCitizen) {
        throw new Error("Failed to verify email");
      }

      return {
        message: "Email verified successfully. You can now log in.",
        citizen: verifiedCitizen,
      };
    } catch (error) {
      console.error("Error in verifyCitizenEmail:", error);
      throw error;
    }
  }

  /**
   * Resend verification email to citizen
   * @param email - The citizen's email
   * @returns Success message
   */
  public async resendVerificationEmail(
    email: string
  ): Promise<{ message: string }> {
    try {
      // Find citizen by email
      const citizen = await this.citizenRepository.findCitizenByEmail(email);
      if (!citizen) {
        throw new Error("Citizen not found");
      }

      // Check if already verified
      if (citizen.email_verified) {
        throw new Error("Email is already verified");
      }

      // Generate new verification token and expiry
      const verificationToken = this.emailService.generateVerificationToken();
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Update citizen with new token
      await this.citizenRepository.updateCitizenVerificationToken(
        citizen.id,
        verificationToken,
        verificationExpires
      );

      // Send verification email
      await this.emailService.sendVerificationEmail(
        citizen.email,
        citizen.fullName,
        verificationToken
      );

      return {
        message:
          "Verification email sent successfully. Please check your email.",
      };
    } catch (error) {
      console.error("Error in resendVerificationEmail:", error);
      throw error;
    }
  }

  /**
   * Get citizen by ID
   * @param id - The citizen's ID
   * @returns The citizen data
   */
  public async getCitizenById(id: number): Promise<Citizen | null> {
    try {
      return await this.citizenRepository.findCitizenById(id);
    } catch (error) {
      console.error("Error in getCitizenById:", error);
      throw error;
    }
  }

  /**
   * Update citizen data
   * @param id - The citizen's ID
   * @param updateData - The data to update
   * @returns The updated citizen
   */
  public async updateCitizen(
    id: number,
    updateData: Partial<CitizenCreationAttributes>
  ): Promise<Citizen | null> {
    try {
      return await this.citizenRepository.updateCitizenById(id, updateData);
    } catch (error) {
      console.error("Error in updateCitizen:", error);
      throw error;
    }
  }

  /**
   * Delete citizen by ID
   * @param id - The citizen's ID
   * @returns Success boolean
   */
  public async deleteCitizen(id: number): Promise<boolean> {
    try {
      return await this.citizenRepository.deleteCitizenById(id);
    } catch (error) {
      console.error("Error in deleteCitizen:", error);
      throw error;
    }
  }

  /**
   * Get all citizens
   * @returns Array of all citizens
   */
  public async getAllCitizens(): Promise<Citizen[]> {
    try {
      return await this.citizenRepository.getAllCitizens();
    } catch (error) {
      console.error("Error in getAllCitizens:", error);
      throw error;
    }
  }
}
