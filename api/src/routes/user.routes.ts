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
import { isSuperAdmin } from "../middleware/isSuperAdmin.middleware";

const UserRouter: Router = Router();
const userController = new UserController();

UserRouter.get("/", isSuperAdmin, catchAsync(userController.getAllUsers));
UserRouter.get("/:id", isSuperAdmin, catchAsync(userController.getSingleUser));

UserRouter.post(
  "/",
  isSuperAdmin,
  userRegisterValidation,
  catchAsync(userController.addNewUser)
);

UserRouter.put(
  "/:id/name",
  isSuperAdmin,
  userFullNameUpdateValidation,
  catchAsync(userController.updateUserFullNameById)
);

UserRouter.put(
  "/:id/role",
  isSuperAdmin,
  userRoleUpdateValidation,
  catchAsync(userController.updateUserRoleById)
);

UserRouter.put(
  "/:id/password",
  isSuperAdmin,
  userPasswordUpdateValidation,
  catchAsync(userController.changeUserPassword)
);

UserRouter.delete(
  "/:id",
  isSuperAdmin,
  userDeleteValidation,
  catchAsync(userController.deleteUser)
);

export default UserRouter;
