import { Request, RequestHandler, Response, NextFunction } from "express";
import { body, validationResult, param } from "express-validator";

export const userRegisterValidation: RequestHandler[] = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),
  body("full_name").notEmpty().withMessage("Full name is required"),
  body("role_id").notEmpty().withMessage("Role ID is required"),
  body("phone_number")
    .optional()
    .isString()
    .withMessage("Phone number must be a string"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userLoginValidation: RequestHandler[] = [
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userFullNameUpdateValidation: RequestHandler[] = [
  body("full_name").notEmpty().withMessage("Full name is required"),
  param("id").isNumeric().withMessage("User ID must be a number"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userRoleUpdateValidation: RequestHandler[] = [
  body("role_id").isNumeric().withMessage("Role ID must be a number"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userPasswordUpdateValidation: RequestHandler[] = [
  body("password").notEmpty().withMessage("Password is required"),
  body("new_password").notEmpty().withMessage("New password is required"),
  // .isLength({ min: 6 })
  // .withMessage("New password must be at least 6 characters long"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const userDeleteValidation: RequestHandler[] = [
  param("id").isNumeric().withMessage("User ID must be a number"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const checkAuthValidation: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "No token provided",
      status: 401,
      error: null,
      data: null,
    });
    return;
  }

  next();
};
