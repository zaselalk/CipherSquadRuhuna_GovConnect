import { Permission } from "../models/permission";
import { sequelizeOptions } from "../services/types/SequalizeQueryOption";

export class PermissionRepository {
  getAllPermissions = async (
    options: sequelizeOptions
  ): Promise<Permission[] | null> => {
    return Permission.findAll<Permission>(options);
  };
}
