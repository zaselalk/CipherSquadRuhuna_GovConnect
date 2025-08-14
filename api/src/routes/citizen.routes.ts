import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { CitizenController } from "../controllers/CitizenController";
import { citizenRegisterValidation } from "../validation/citizen";

const CitizenRouter: Router = Router();
const citizenController = new CitizenController();

CitizenRouter.get("/", catchAsync(citizenController.getAllCitizens));
CitizenRouter.post(
  "/",
  citizenRegisterValidation,
  catchAsync(citizenController.registerResident)
);
CitizenRouter.get("/:id", catchAsync(citizenController.findCitizenById));
CitizenRouter.put("/:id", catchAsync(citizenController.updateCitizenById));
CitizenRouter.delete("/:id", catchAsync(citizenController.deleteCitizenById));

export default CitizenRouter;
