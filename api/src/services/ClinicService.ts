import Clinic from "../models/clinic";
import { ClinicRepository } from "../repositories/ClinicRepository";

interface NewClinic {
  name: string;
}

export class ClinicService {
  private clinicRepository = new ClinicRepository();

  async createClinic(name: string): Promise<Clinic> {
    return this.clinicRepository.createClinic(name);
  }
  //   // Get all clinics
  async getAllClinics(): Promise<Clinic[]> {
    return this.clinicRepository.getAllClinics();
  }

  // // Get a clinic by ID
  async getClinicById(id: number): Promise<Clinic | null> {
    return this.clinicRepository.getClinicById(id);
  }

  // Update a clinic
  async updateClinic(
    id: number,
    data: Partial<Clinic>
  ): Promise<Clinic | null> {
    return this.clinicRepository.updateClinic(id, data);
  }

  // // Delete a clinic
  async deleteClinic(id: number): Promise<boolean> {
    return this.clinicRepository.deleteClinic(id);
  }
}
