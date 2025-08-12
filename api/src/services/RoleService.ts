import { RoleRepository } from "../repositories/RoleRepository";
import { UserRepository } from "../repositories/UserRepository";
import { logSuperUserAction } from "../util/superUserLogger";

export class RoleService {
  private userRepository: UserRepository;

  constructor(private roleRepositroy: RoleRepository) {
    this.userRepository = new UserRepository();
  }

  createRole = async (role: string, permission: string[]) => {
    if (role === "super_user") {
      logSuperUserAction({
        userId: "system",
        action: "Attempted to create super_user role via API",
      });
      throw new Error("Creating the super_user role via API is forbidden.");
    }
    const newRole = await this.roleRepositroy.create(role, permission);
    return newRole;
  };

  getAllRoles = async () => {
    const roles = await this.roleRepositroy.findAll();
    return roles;
  };

  getRoleById = async (id: number) => {
    const role = await this.roleRepositroy.findById(id);
    return role;
  };

  updateRole = async (id: number, role: string, permission: string) => {
    const foundRole = await this.roleRepositroy.findById(id);
    if (!foundRole) {
      throw new Error("Role not found");
    }
    if (foundRole.role === "super_user") {
      logSuperUserAction({
        userId: "system",
        action: `Attempted to update super_user role (id=${id}) via API`,
      });
      throw new Error("Modifying the super_user role is forbidden.");
    }
    const updatedRole = await this.roleRepositroy.update(id, role, permission);
    return updatedRole;
  };

  deleteRole = async (id: number) => {
    const foundRole = await this.roleRepositroy.findById(id);
    if (foundRole && foundRole.role === "super_user") {
      logSuperUserAction({
        userId: "system",
        action: `Attempted to delete super_user role (id=${id}) via API`,
      });
      throw new Error("Deleting the super_user role is forbidden.");
    }

    // Check if there are users associated with this role
    const associatedUsers = await this.userRepository.findUsersByRoleId(id);
    if (associatedUsers.length > 0) {
      throw new Error("You can't delete this role, because it is associated with a user.");
    }

    try {
      await this.roleRepositroy.delete(id);
    } catch (error: any) {
      // Handle foreign key constraint error as a fallback
      if (error.message && error.message.includes("foreign key constraint")) {
        throw new Error("You can't delete this role, because it is associated with a user.");
      }
      // Re-throw other errors
      throw error;
    }
  };
}
