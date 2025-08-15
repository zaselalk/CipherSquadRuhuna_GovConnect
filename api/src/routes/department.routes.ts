import { Router } from "express";
import { DepartmentController } from "../controllers/DepartmentController";
import catchAsync from "../util/catchAsync";
import { departmentCreateValidation, departmentGetValidation, departmentUpdateValidation } from "../validation/department";

const router = Router();
const controller = new DepartmentController();

router.get("/",departmentGetValidation, catchAsync(controller.getAllDepartments));
router.get("/:id",departmentGetValidation, catchAsync(controller.getDepartmentById));
router.post("/",departmentCreateValidation, catchAsync(controller.createDepartment));
router.put("/:id",departmentUpdateValidation, catchAsync(controller.updateDepartment));
router.delete("/:id", catchAsync(controller.deleteDepartment));

export default router;
