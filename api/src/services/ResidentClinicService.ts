import { ResidentClinic } from "../models/residentClinic";
import { ResidentClinicRepository } from "../repositories/ResidentClinicRepository";
import { Resident } from "../models/resident";
import { Division } from "../models/division";
import { Sequelize } from "sequelize";

/**
 * Service for managing resident-clinic associations.
 */
interface PatientCountByDivision {
  divisionId: number;
  divisionName: string;
  residentCount: number;
}
export class ResidentClinicService {
  constructor(private residentClinicRepository: ResidentClinicRepository) {}

  async createResidentClinic(
    residentId: number,
    clinicId: number
  ): Promise<ResidentClinic> {
    return this.residentClinicRepository.createResidentClinic(
      residentId,
      clinicId
    );
  }

  async findByResidentId(residentId: number): Promise<ResidentClinic | null> {
    return this.residentClinicRepository.findByResidentId(residentId);
  }

  async findByClinicId(clinicId: number): Promise<ResidentClinic | null> {
    return this.residentClinicRepository.findByClinicId(clinicId);
  }

  async getAllResidentClinics(): Promise<ResidentClinic[]> {
    return this.residentClinicRepository.getAllResidentClinics();
  }

  async deleteResidentClinic(id: number): Promise<void> {
    await this.residentClinicRepository.deleteResidentClinic(id);
  }

  async findByResidentIdAndClinicId(
    residentId: number,
    clinicId: number
  ): Promise<ResidentClinic | null> {
    return this.residentClinicRepository.findByResidentIdAndClinicId(
      residentId,
      clinicId
    );
  }

  // Get residents registered for a specific clinic
  async getResidentsByClinicId(
    clinicId: number
  ): Promise<ResidentClinic[] | null> {
    return this.residentClinicRepository.getAllResidentsInClinicByClinicId(
      clinicId
    );
  }

  // Get division-wise resident count for a specific clinic
  async getDivisionPatientCountByClinic(
    clinicId: number
  ): Promise<PatientCountByDivision[]> {
    const results: PatientCountByDivision[] = (await ResidentClinic.findAll({
      where: { clinicId },
      include: [
        {
          model: Resident,
          as: "resident",
          include: [
            {
              model: Division,
              as: "division",
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
      group: [
        "resident.divisionId",
        "resident.division.divisionName",
        "resident.division.divisionId",
      ],
      attributes: [
        [Sequelize.col("resident.division.divisionId"), "divisionId"],
        [Sequelize.col("resident.division.divisionName"), "divisionName"],
        [Sequelize.fn("COUNT", Sequelize.col("resident.id")), "residentCount"],
      ],
      raw: true,
    })) as unknown as PatientCountByDivision[];

    return results;
  }
}
