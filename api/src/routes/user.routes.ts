import { Router } from "express";
import { UserController } from "../controllers/UserController";
import catchAsync from "../util/catchAsync";
import {
  userFullNameUpdateValidation,
  userPasswordUpdateValidation,
  userRoleUpdateValidation,
  userDeleteValidation,
  userRegisterValidation,
} from "../validation/user";

const UserRouter: Router = Router();
const userController = new UserController();

UserRouter.get("/", catchAsync(userController.getAllUsers));
UserRouter.get("/:id", catchAsync(userController.getSingleUser));

UserRouter.post(
  "/",
  userRegisterValidation,
  catchAsync(userController.addNewUser)
);

UserRouter.put(
  "/:id/name",
  userFullNameUpdateValidation,
  catchAsync(userController.updateUserFullNameById)
);

UserRouter.put(
  "/:id/role",
  userRoleUpdateValidation,
  catchAsync(userController.updateUserRoleById)
);

UserRouter.put(
  "/:id/password",
  userPasswordUpdateValidation,
  catchAsync(userController.changeUserPassword)
);

UserRouter.delete(
  "/:id",
  userDeleteValidation,
  catchAsync(userController.deleteUser)
);

export default UserRouter;
