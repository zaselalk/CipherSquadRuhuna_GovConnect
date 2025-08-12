import { Request, Response } from "express";
import { RoleController } from "../RoleController";
import { RoleService } from "../../services/RoleService";
import { RoleRepository } from "../../repositories/RoleRepository";

jest.mock("../../repositories/RoleRepository");
jest.mock("../../services/RoleService");

describe("RoleController", () => {
  let roleController: RoleController;
  let mockRoleService: jest.Mocked<RoleService>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create mock response object
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Create mock request object
    mockReq = {
      params: {},
      body: {},
    };

    // Mock RoleService
    mockRoleService = {
      updateRole: jest.fn(),
    } as any;

    // Create controller instance
    roleController = new RoleController();
    
    // Replace the service with our mock
    (roleController as any).roleService = mockRoleService;
  });

  describe("updateRole", () => {
    it("Should return 404 when role not found", async () => {
      const roleId = "780";
      const roleName = "Updated Role";
      const permissionList = ["user:create"];

      mockReq.params = { id: roleId };
      mockReq.body = { roleName, permissionList };

      mockRoleService.updateRole.mockRejectedValue(new Error("Role not found"));

      await roleController.updateRole(mockReq, mockRes);

      expect(mockRoleService.updateRole).toHaveBeenCalledWith(roleId, roleName, permissionList);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Role not found" });
    });

    it("Should return 403 when trying to update super_user role", async () => {
      const roleId = "1";
      const roleName = "Updated Role";
      const permissionList = ["user:create"];

      mockReq.params = { id: roleId };
      mockReq.body = { roleName, permissionList };

      mockRoleService.updateRole.mockRejectedValue(
        new Error("Modifying the super_user role is forbidden.")
      );

      await roleController.updateRole(mockReq, mockRes);

      expect(mockRoleService.updateRole).toHaveBeenCalledWith(roleId, roleName, permissionList);
      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: "Modifying the super_user role is forbidden." 
      });
    });

    it("Should return 200 when role updated successfully", async () => {
      const roleId = "2";
      const roleName = "Updated Role";
      const permissionList = ["user:create"];
      const updatedRole = { id: 2, role: roleName, permission: JSON.stringify(permissionList) } as any;

      mockReq.params = { id: roleId };
      mockReq.body = { roleName, permissionList };

      mockRoleService.updateRole.mockResolvedValue(updatedRole);

      await roleController.updateRole(mockReq, mockRes);

      expect(mockRoleService.updateRole).toHaveBeenCalledWith(roleId, roleName, permissionList);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Role updated successfully",
        data: updatedRole,
      });
    });

    it("Should return 500 for other errors", async () => {
      const roleId = "2";
      const roleName = "Updated Role";
      const permissionList = ["user:create"];

      mockReq.params = { id: roleId };
      mockReq.body = { roleName, permissionList };

      mockRoleService.updateRole.mockRejectedValue(new Error("Database connection failed"));

      await roleController.updateRole(mockReq, mockRes);

      expect(mockRoleService.updateRole).toHaveBeenCalledWith(roleId, roleName, permissionList);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ 
        message: "Database connection failed" 
      });
    });
  });
});