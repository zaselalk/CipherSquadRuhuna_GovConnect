import { UniqueConstraintError } from "sequelize";
import { PermissionRepository } from "../repositories/PermissionRepository";
import { RoleRepository } from "../repositories/RoleRepository";
import { RoleService } from "../services/RoleService";
import { NextFunction } from "express";

/**
 * RoleController class handles the role management operations.
 * It provides methods to create, retrieve, update, and delete roles.
 */

export class RoleController {
  private roleService: RoleService;

  constructor() {
    const roleRepository = new RoleRepository();
    this.roleService = new RoleService(roleRepository);
  }

  /**
   * Creates a new role with the specified name and permissions.
   * @param req - The request object containing role details.
   * @param res - The response object to send the result.
   */
  createRole = async (req: any, res: any, next: NextFunction): Promise<any> => {
    const { roleName, permissionList } = req.body;
    const permissionRepo = new PermissionRepository();

    // get all permissions from the database
    const allPermissions = await permissionRepo.getAllPermissions({});

    // If no permissions are found, return an error
    if (!allPermissions || allPermissions.length === 0) {
      return res.status(400).json({
        message: "No permissions available to assign to the role",
      });
    }

    // format the permissions to a list of strings
    const validPermissionList = allPermissions?.map((permission) => {
      return permission.permission;
    });

    // Check if the provided permissionList is valid
    const isValid = permissionList.every((permission: string) =>
      validPermissionList.includes(permission)
    );

    // If any permission in the permissionList is invalid, return an error
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid permissions",
      });
    }

    try {
      const newRole = await this.roleService.createRole(
        roleName,
        permissionList
      );
      return res.status(201).json({
        message: "Role created successfully",
        data: newRole,
      });
    } catch (error: any) {
      // Handle Sequelize validation errors
      if (error instanceof UniqueConstraintError) {
        return res.status(409).json({
          message: "Role already exists",
        });
      }
      next(error);
    }
  };

  /**
   * Retrieves all roles from the database.
   * @param req - The request object.
   * @param res - The response object to send the result.
   */
  getAllRoles = async (req: any, res: any): Promise<any> => {
    const roles = await this.roleService.getAllRoles();
    return res.status(200).json({
      message: "Roles retrieved successfully",
      data: roles,
    });
  };

  /**
   * Retrieves a role by its ID.
   * @param req - The request object containing the role ID.
   * @param res - The response object to send the result.
   */
  getRoleById = async (req: any, res: any): Promise<any> => {
    const { id } = req.params;
    const role = await this.roleService.getRoleById(id);
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    return res.status(200).json({
      message: "Role retrieved successfully",
      data: role,
    });
  };

  /**
   * Updates a role by its ID with the specified name and permissions.
   * @param req - The request object containing the role ID and updated details.
   * @param res - The response object to send the result.
   */
  updateRole = async (req: any, res: any): Promise<any> => {
    const { id } = req.params;
    const { roleName, permissionList } = req.body;
    try {
      const updatedRole = await this.roleService.updateRole(
        id,
        roleName,
        permissionList
      );
      return res.status(200).json({
        message: "Role updated successfully",
        data: updatedRole,
      });
    } catch (err: any) {
      if (err.message && err.message.includes("super_user")) {
        return res.status(403).json({ message: err.message });
      }
      if (err.message && err.message.includes("Role not found")) {
        return res.status(404).json({ message: err.message });
      }
      return res
        .status(500)
        .json({ message: err.message || "Internal server error" });
    }
  };

  /**
   * Deletes a role by its ID.
   * @param req - The request object containing the role ID.
   * @param res - The response object to send the result.
   */
  deleteRole = async (req: any, res: any): Promise<any> => {
    const { id } = req.params;
    try {
      await this.roleService.deleteRole(id);
      return res.status(200).json({
        message: "Role deleted successfully",
      });
    } catch (err: any) {
      if (err.message && err.message.includes("super_user")) {
        return res.status(403).json({ message: err.message });
      }
      return res
        .status(500)
        .json({ message: err.message || "Internal server error" });
    }
  };
}
