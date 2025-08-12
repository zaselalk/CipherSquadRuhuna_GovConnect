import { HouseholdNotFoundException } from "../exceptions/HouseholdNotFound";
import Household from "../models/household";

import { HouseholdRepository } from "../repositories/HouseholdRepository";

export class HouseholdServices {
  private householdRepository: HouseholdRepository;

  constructor(householdRepository: HouseholdRepository) {
    this.householdRepository = householdRepository;
  }

  async registerHousehold(
    house_no: string,
    grama_division: string,
    longitude: string,
    latitude: string,
    owner_id?: number
  ): Promise<Household> {
    return this.householdRepository.createHousehold(house_no, grama_division, longitude, latitude, owner_id);
  }

  // Read
  async getAllHouseholdsWithOwnerName(): Promise<any[]> {
    return this.householdRepository.getAllHouseholdsWithOwnerName();
  }

  // Update Household Owner by house_no
  async updateOwnerByHouseId(id:number, owner_id: number): Promise<boolean> {
    return this.householdRepository.updateOwnerByHouseId(id, owner_id);
  }

  // Delete Household by house_no
  async deleteHouseholdById(id: number): Promise<boolean> {
    const household = await this.householdRepository.findHouseholdById(id);
    if (!household) {
      throw new HouseholdNotFoundException("Household not found");
    }
    return this.householdRepository.deleteHouseholdById(id);
  }

  //Household Count
  async householdCount(): Promise<number> {
    return this.householdRepository.householdCount();
  }
// Household Count by Division**
async getHouseholdCountByDivision(divisionId: string): Promise<number> {
  return this.householdRepository.countHouseholdsByDivision(divisionId);
}
// Find Households by Division**
  async findHouseholdsByDivision(divisionId: string): Promise<Household[]> {
  return this.householdRepository.findHouseholdsByDivision(divisionId);
}




  async getHouseholdsByOwnerId(owner_id: number): Promise<Household[]> {
  return this.householdRepository.findHouseholdsByOwnerId(owner_id);
}


}
