import { Router } from "express";
import { DepartmentController } from "../controllers/DepartmentController";
import catchAsync from "../util/catchAsync";

const router = Router();
const controller = new DepartmentController();

router.get("/", catchAsync(controller.getAllDepartments));
router.get("/:id", catchAsync(controller.getDepartmentById));
router.post("/", catchAsync(controller.createDepartment));
router.put("/:id", catchAsync(controller.updateDepartment));
router.delete("/:id", catchAsync(controller.deleteDepartment));

export default router;
