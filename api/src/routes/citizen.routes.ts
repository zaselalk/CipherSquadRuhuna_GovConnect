import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { CitizenController } from "../controllers/CitizenController";
import {
  citizeLoginValidation,
  citizenRegisterValidation,
} from "../validation/citizen";

const CitizenRouter: Router = Router();
const citizenController = new CitizenController();

CitizenRouter.get("/", catchAsync(citizenController.getAllCitizens));
CitizenRouter.post(
  "/register",
  citizenRegisterValidation,
  catchAsync(citizenController.registerCitizen)
);
CitizenRouter.post(
  "/login",
  citizeLoginValidation,
  catchAsync(citizenController.loginCitizen)
);
CitizenRouter.get("/:id", catchAsync(citizenController.findCitizenById));
CitizenRouter.put("/:id", catchAsync(citizenController.updateCitizenById));
CitizenRouter.delete("/:id", catchAsync(citizenController.deleteCitizenById));

export default CitizenRouter;
