import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { CitizenController } from "../controllers/CitizenController";

const CitizenRouter: Router = Router();
const citizenController = new CitizenController();

CitizenRouter.get("/", catchAsync(citizenController.getAllCitizens));
CitizenRouter.post("/", catchAsync(citizenController.createCitizen));
CitizenRouter.get("/:id", catchAsync(citizenController.findCitizenById));
CitizenRouter.put("/:id", catchAsync(citizenController.updateCitizenById));
CitizenRouter.delete("/:id", catchAsync(citizenController.deleteCitizenById));

export default CitizenRouter;
