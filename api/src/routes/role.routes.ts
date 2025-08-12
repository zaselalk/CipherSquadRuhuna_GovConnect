import { Router } from "express";
import { RoleController } from "../controllers/RoleController";
import catchAsync from "../util/catchAsync";
import { isSuperAdmin } from "../middleware/isSuperAdmin.middleware";

const RoleRouter: Router = Router();
const roleController: RoleController = new RoleController();

/**
 * Role management routes
 * These routes handle the creation, retrieval, updating, and deletion of roles.
 */

// POST /api/roles - Create a new role
RoleRouter.post("/", isSuperAdmin, catchAsync(roleController.createRole));

// GET /api/roles - Retrieve all roles
RoleRouter.get("/", isSuperAdmin, catchAsync(roleController.getAllRoles));

// GET /api/roles/:id - Retrieve a role by ID
RoleRouter.get("/:id", isSuperAdmin, catchAsync(roleController.getRoleById));

// PATCH /api/roles/:id - Update a role by ID
RoleRouter.patch("/:id", isSuperAdmin, catchAsync(roleController.updateRole));

// DELETE /api/roles/:id - Delete a role by ID
RoleRouter.delete("/:id", isSuperAdmin, catchAsync(roleController.deleteRole));

export default RoleRouter;
