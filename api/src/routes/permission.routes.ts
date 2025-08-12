import { Router } from "express";
import { PermissionController } from "../controllers/PermissionController";
import catchAsync from "../util/catchAsync";

const PermissionRouter: Router = Router();
const permissionController = new PermissionController();

PermissionRouter.get("/", catchAsync(permissionController.getPermissions));

export default PermissionRouter;
