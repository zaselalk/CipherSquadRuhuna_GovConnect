// services/HouseholdResidentServices.ts

import { HouseholdResidentRepository } from "../repositories/HouseholdResidentRepository";

export class HouseholdResidentServices {
  private repository: HouseholdResidentRepository;

  constructor(repository = new HouseholdResidentRepository()) {
    this.repository = repository;
  }

  async getResidentsByHousehold(householdId: number) {
    return this.repository.findByHouseholdId(householdId);
  }

  async addResidentToHousehold(
    householdId: number,
    residentId: number,
    relation: string,
  ) {
    return this.repository.addResidentToHousehold(
      householdId,
      residentId,
      relation,
    );
  }

  async removeResidentFromHousehold(id: number) {
    return this.repository.removeResidentFromHousehold(id);
  }

  async removeAllResidentsByHouseholdId(householdId: number) {
  return this.repository.removeAllResidentsByHouseholdId(householdId);
}

  async updateOwnerResidentRelation(householdId: number, residentId: number) {
  return this.repository.updateOwnerResidentRelation(householdId, residentId);
}

}
