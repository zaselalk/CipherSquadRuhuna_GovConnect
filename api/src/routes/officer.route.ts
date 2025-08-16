import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { OfficerController } from "../controllers/OfficerController";

const OfficerRouter = Router();
const officerController = new OfficerController();

OfficerRouter.get("/", catchAsync(officerController.getAllOfficers));
OfficerRouter.get("/:id", catchAsync(officerController.getOfficerById));
OfficerRouter.post("/", catchAsync(officerController.createOfficer));
OfficerRouter.put("/:id", catchAsync(officerController.updateOfficer));
OfficerRouter.delete("/:id", catchAsync(officerController.deleteOfficer));
OfficerRouter.get("/department/:dep_id", catchAsync(officerController.getOfficersByDepartment));
export default OfficerRouter;
  