import { Router } from "express";
import { UserController } from "../controllers/UserController";
import catchAsync from "../util/catchAsync";
import {
  checkAuthValidation,
  userLoginValidation,
  userRegisterValidation,
} from "../validation/user";

const AuthRouter: Router = Router();
const userController = new UserController();

AuthRouter.post(
  "/login",
  userLoginValidation,
  catchAsync(userController.login)
);
AuthRouter.post(
  "/register",
  userRegisterValidation,
  catchAsync(userController.register)
);

AuthRouter.get(
  "/check",
  checkAuthValidation,
  catchAsync(userController.checkAuthStatus)
);

export default AuthRouter;
