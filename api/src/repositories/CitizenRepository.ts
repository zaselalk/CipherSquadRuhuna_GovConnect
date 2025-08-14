import { Citizen } from "../models/citizen";
import { CitizenAttributes, CitizenCreationAttributes } from "../types/citizen";

export class CitizenRepository {
  private static instance: CitizenRepository;

  private constructor() {}

  public static getInstance(): CitizenRepository {
    if (!CitizenRepository.instance) {
      CitizenRepository.instance = new CitizenRepository();
    }
    return CitizenRepository.instance;
  }

  /**
   * Create a new citizen
   * @param citizenData - The data of the citizen to create
   * @return The created citizen
   */
  public async createCitizen(
    citizenData: CitizenCreationAttributes
  ): Promise<Citizen> {
    try {
      const citizen = await Citizen.create(citizenData);
      return citizen;
    } catch (error) {
      console.error("Error creating citizen:", error);
      throw new Error("Failed to create citizen");
    }
  }

  /**
   * Find a citizen by ID
   * @param id - The ID of the citizen to find
   * @return The found citizen or null if not found
   */
  public async findCitizenById(id: number): Promise<Citizen | null> {
    try {
      const citizen = await Citizen.findByPk(id);
      return citizen;
    } catch (error) {
      console.error("Error finding citizen by ID:", error);
      throw new Error("Failed to find citizen");
    }
  }

  /**
   * Update a citizen by ID
   * @param id - The ID of the citizen to update
   * @param updateData - The data to update the citizen with
   * @return The updated citizen or null if not found
   */
  public async updateCitizenById(
    id: number,
    updateData: Partial<CitizenAttributes>
  ): Promise<Citizen | null> {
    try {
      const citizen = await this.findCitizenById(id);
      if (!citizen) {
        return null;
      }
      await citizen.update(updateData);
      return citizen;
    } catch (error) {
      console.error("Error updating citizen by ID:", error);
      throw new Error("Failed to update citizen");
    }
  }

  /**
   * Delete a citizen by ID
   * @param id - The ID of the citizen to delete
   * @return True if the citizen was deleted, false if not found
   */
  public async deleteCitizenById(id: number): Promise<boolean> {
    try {
      const citizen = await this.findCitizenById(id);
      if (!citizen) {
        return false;
      }
      await citizen.destroy();
      return true;
    } catch (error) {
      console.error("Error deleting citizen by ID:", error);
      throw new Error("Failed to delete citizen");
    }
  }

  /**
   * Get all citizens
   * @return An array of all citizens
   */
  public async getAllCitizens(): Promise<Citizen[]> {
    try {
      const citizens = await Citizen.findAll();
      return citizens;
    } catch (error) {
      console.error("Error getting all citizens:", error);
      throw new Error("Failed to retrieve citizens");
    }
  }

  /**
   * Get citizen count
   * @return The count of citizens
   */
  public async getCitizenCount(): Promise<number> {
    try {
      const count = await Citizen.count();
      return count;
    } catch (error) {
      console.error("Error getting citizen count:", error);
      throw new Error("Failed to retrieve citizen count");
    }
  }

  /**
   * Find a citizen by email
   * @param email - The email of the citizen to find
   * @return The found citizen or null if not found
   */
  public async findCitizenByEmail(email: string): Promise<Citizen | null> {
    try {
      const citizen = await Citizen.findOne({ where: { email } });
      return citizen;
    } catch (error) {
      console.error("Error finding citizen by email:", error);
      throw new Error("Failed to find citizen by email");
    }
  }
}
