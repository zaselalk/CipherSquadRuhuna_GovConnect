import { Request, Response } from "express";
import { PermissionService } from "../services/permissionServices";
import { PermissionRepository } from "../repositories/PermissionRepository";

export class PermissionController {
  private permissionSerivce: PermissionService;

  constructor() {
    const permissionRepository = new PermissionRepository();
    this.permissionSerivce = new PermissionService(permissionRepository);
  }

  getPermissions = async (req: Request, res: Response): Promise<Response> => {
    const permissions = await this.permissionSerivce.getAllPermissions();

    if (!permissions) {
      return res.status(404).json({ message: "No permissions found" });
    }

    return res.json(permissions);
  };
}
