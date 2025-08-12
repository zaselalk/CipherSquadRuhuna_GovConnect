import { Router } from "express";
import ResidentController from "../controllers/ResidentController";
import { protectRoute } from "../middleware/authjwt.middleware";
import catchAsync from "../util/catchAsync";
import { valiadteResident } from "../validation/resident";

const ResidentRouter: Router = Router();
const residentController = new ResidentController();

// ResidentRouter.get(
//   "/ping",
//   protectRoute,
//   catchAsync(residentController.residentPing)
// );
ResidentRouter.get("/", catchAsync(residentController.getAllResident));
ResidentRouter.post(
  "/createResident",
  valiadteResident,
  protectRoute("resident:create"),
  catchAsync(residentController.residentRegister)
);
ResidentRouter.get(
  "/nic/:nic",
  catchAsync(residentController.residentfindByNic)
);
ResidentRouter.get("/id/:id", catchAsync(residentController.residentfindById));
ResidentRouter.put(
  "/update/:id",
  // protectRoute("resident:edit"),
  catchAsync(residentController.updateResident)
);
ResidentRouter.delete(
  "/delete/:id",
  protectRoute("resident:edit"),
  catchAsync(residentController.deleteResidentById)
);

ResidentRouter.get(
  "/residentOverview",
  catchAsync(residentController.getResidentOverview)
);

ResidentRouter.get(
  "/residentCount",
  catchAsync(residentController.getResidentCount)
);

ResidentRouter.get(
  "/disease-patient-counts/:divisionId",
  catchAsync(residentController.getDiseasePatientCounts)
);

ResidentRouter.post(
  "/login",
  catchAsync(residentController.loginResidentByEmailandPassword)
);

ResidentRouter.get(
  "/division/:divisionId/count",
  catchAsync(residentController.getResidentCountByDivision)
);

export default ResidentRouter;
