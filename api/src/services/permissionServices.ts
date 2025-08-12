import { Permission } from "../models/permission";
import { PermissionRepository } from "../repositories/PermissionRepository";
import { sequelizeOptions } from "./types/SequalizeQueryOption";

export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  getAllPermissions = async (): Promise<Permission[] | null> => {
    let options: sequelizeOptions = {
      attributes: ["id", "permission"],
    };

    const permissions = await this.permissionRepository.getAllPermissions(
      options
    );
    return permissions;
  };
}
