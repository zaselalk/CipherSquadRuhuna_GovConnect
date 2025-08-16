import { Router } from "express";
import { UserController } from "../controllers/UserController";
import catchAsync from "../util/catchAsync";
import { checkAuthValidation, userLoginValidation } from "../validation/user";

const AuthRouter: Router = Router();
const userController = new UserController();

AuthRouter.post(
  "/login",
  userLoginValidation,
  catchAsync(userController.login)
);

AuthRouter.get(
  "/check",
  checkAuthValidation,
  catchAsync(userController.checkAuthStatus)
);

export default AuthRouter;
