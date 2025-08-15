// routes/DepartmentServiceRoutes.ts
import { Router } from "express";
import { DepartmentServiceController } from "../controllers/DepartmentServiceController";
import catchAsync from "../util/catchAsync";
import { DepartmentServiceService } from "../services/DerpartmentServiceService";

const DepartmentServiceRouter = Router();
const departmentServiceController = new DepartmentServiceController();

DepartmentServiceRouter.post("/", catchAsync(departmentServiceController.createService));
DepartmentServiceRouter.get("/", catchAsync(departmentServiceController.getAllServices));
DepartmentServiceRouter.get("/:id", catchAsync(departmentServiceController.getServiceById));
DepartmentServiceRouter.put("/:id", catchAsync(departmentServiceController.updateService));
DepartmentServiceRouter.delete("/:id", catchAsync(departmentServiceController.deleteService));
DepartmentServiceRouter.get("/department/:dep_id", catchAsync(departmentServiceController.getServicesByDepartment));

export default DepartmentServiceRouter;
