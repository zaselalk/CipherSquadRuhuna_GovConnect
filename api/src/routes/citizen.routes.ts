import { Router } from "express";
import catchAsync from "../util/catchAsync";
import { CitizenController } from "../controllers/CitizenController";
import {
  citizeLoginValidation,
  citizenEmailVerificationValidation,
  citizenRegisterValidation,
} from "../validation/citizen";
import serializeCitizen, {
  requireCitizenAuth,
} from "../middleware/citizenAuth.middleware";

const CitizenRouter: Router = Router();
const citizenController = new CitizenController();

CitizenRouter.get("/", catchAsync(citizenController.getAllCitizens));
CitizenRouter.post(
  "/auth/register",
  citizenRegisterValidation,
  catchAsync(citizenController.registerCitizen)
);
CitizenRouter.post(
  "/auth/login",
  citizeLoginValidation,
  catchAsync(citizenController.loginCitizen)
);
CitizenRouter.get(
  "/auth/verify-email",
  citizenEmailVerificationValidation,
  catchAsync(citizenController.verifyEmail)
);
CitizenRouter.post(
  "/auth/resend-verification",
  catchAsync(citizenController.resendVerificationEmail)
);
CitizenRouter.get(
  "/auth/check",
  serializeCitizen,
  requireCitizenAuth,
  catchAsync(citizenController.checkToken)
);
CitizenRouter.get("/:id", catchAsync(citizenController.findCitizenById));
CitizenRouter.put("/:id", catchAsync(citizenController.updateCitizenById));
CitizenRouter.delete("/:id", catchAsync(citizenController.deleteCitizenById));

export default CitizenRouter;
