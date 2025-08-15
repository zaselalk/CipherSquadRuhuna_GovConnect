import { Request, Response } from 'express';
import { OfficerService } from '../services/OfficerService';

export class OfficerController {
  private officerService: OfficerService;

  constructor() {
    this.officerService = new OfficerService();
  }

  public getAllOfficers = async (req: Request, res: Response): Promise<void> => {
    const officers = await this.officerService.getAllOfficers();
    res.json(officers);
  };

  public getOfficerById = async (req: Request, res: Response): Promise<void> => {
    const officer = await this.officerService.getOfficerById(Number(req.params.id));
    res.json(officer);
  };

  public createOfficer = async (req: Request, res: Response): Promise<void> => {
    const officer = await this.officerService.createOfficer(req.body);
    res.status(201).json(officer);
  };

  public updateOfficer = async (req: Request, res: Response): Promise<void> => {
    const officer = await this.officerService.updateOfficer(Number(req.params.id), req.body);
    res.json(officer);
  };

  public deleteOfficer = async (req: Request, res: Response): Promise<void> => {
    const success = await this.officerService.deleteOfficer(Number(req.params.id));
    res.status(success ? 204 : 404).send();
  };

  // (Better name) officers by department id
  public getOfficersByDepartment = async (req: Request, res: Response): Promise<void> => {
    const officers = await this.officerService.getDepartmentByOfficer(Number(req.params.dep_id));
    res.json(officers);
  };

  
}
