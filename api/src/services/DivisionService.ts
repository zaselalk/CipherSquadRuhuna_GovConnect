import DivisionRepository from "../repositories/DivisionRepository";

class DivisionService {
  async getAllDivisions() {
    return await DivisionRepository.getAllDivisions();
  }

  async getDivisionById(id: number) {
    const division = await DivisionRepository.getDivisionById(id);
    if (!division) {
      throw new Error(`Division with ID ${id} not found`);
    }
    return division;
  }

  async createDivision(divisionName: string) {
    // Check if division name already exists
    const existing = await DivisionRepository.getDivisionByName(divisionName);
    if (existing) {
      throw new Error("Division name must be unique");
    }

    return await DivisionRepository.createDivision(divisionName);
  }

  async updateDivision(id: number, divisionName: string) {
    // Optional: Check if new name already exists
    const existing = await DivisionRepository.getDivisionByName(divisionName);
    if (existing && existing.divisionId !== id) {
      throw new Error("Another division with this name already exists");
    }

    const updated = await DivisionRepository.updateDivision(id, { divisionName });
    if (!updated) {
      throw new Error(`Division with ID ${id} not found`);
    }

    return updated;
  }

  async deleteDivision(id: number) {
    const deleted = await DivisionRepository.deleteDivision(id);
    if (!deleted) {
      throw new Error(`Division with ID ${id} not found`);
    }
    return deleted;
  }


  async getDivisionCount() {
    return await DivisionRepository.getDivisionCount();
  }
}

export default new DivisionService();
