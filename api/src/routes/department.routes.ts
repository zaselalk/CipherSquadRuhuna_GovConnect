import { Router } from "express";
import { DepartmentController } from "../controllers/DepartmentController";
import catchAsync from "../util/catchAsync";
import {
  departmentCreateValidation,
  departmentGetValidation,
  departmentUpdateValidation,
} from "../validation/department";
import { protectRoute } from "../middleware/authjwt.middleware";

const router = Router();
const controller = new DepartmentController();

router.get(
  "/",
  departmentGetValidation,
  catchAsync(controller.getAllDepartments)
);
router.get(
  "/:id",
  departmentGetValidation,
  catchAsync(controller.getDepartmentById)
);
router.post(
  "/",
  departmentCreateValidation,
  protectRoute(["Administrator", "Analyst"]),
  catchAsync(controller.createDepartment)
);
router.put(
  "/:id",
  departmentUpdateValidation,
  protectRoute(["Administrator", "Analyst"]),
  catchAsync(controller.updateDepartment)
);

router.delete(
  "/:id",
  protectRoute(["Administrator", "Analyst"]),
  catchAsync(controller.deleteDepartment)
);

export default router;
