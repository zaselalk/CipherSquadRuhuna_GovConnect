import { Router } from "express";
import { DepartmentServiceController } from "../controllers/DepartmentServiceController";
import catchAsync from "../util/catchAsync";

const DepartmentServiceRouter = Router();
const departmentServiceController = new DepartmentServiceController();

DepartmentServiceRouter.post("/", catchAsync(departmentServiceController.createService));

// Get all services
DepartmentServiceRouter.get("/", catchAsync(departmentServiceController.getAllServices));

// Get services by department first (specific route)
DepartmentServiceRouter.get("/department/:dep_id", catchAsync(departmentServiceController.getServicesByDepartment));

// Get service by ID
DepartmentServiceRouter.get("/:id", catchAsync(departmentServiceController.getServiceById));

// Update & delete
DepartmentServiceRouter.put("/:id", catchAsync(departmentServiceController.updateService));
DepartmentServiceRouter.delete("/:id", catchAsync(departmentServiceController.deleteService));

export default DepartmentServiceRouter;
