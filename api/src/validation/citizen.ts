import { body, query, validationResult } from "express-validator";
import { Request, RequestHandler, Response, NextFunction } from "express";

/**
 * Validation for citizen registration
 */
export const citizenRegisterValidation: RequestHandler[] = [
  body("fullName").notEmpty().withMessage("fullName is required"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),
  body("dateOfBirth")
    .optional()
    .isDate()
    .withMessage("Date of Birth must be a valid date"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("contactNumber")
    .optional()
    .isString()
    .withMessage("Contact Number must be a string"),
  body("NICNumber")
    .optional()
    .isString()
    .withMessage("NIC Number must be a string"),
  body("createdAt")
    .optional()
    .isISO8601()
    .withMessage("Created At must be a valid date"),
  body("updatedAt")
    .optional()
    .isISO8601()
    .withMessage("Updated At must be a valid date"),
  body("deletedAt")
    .optional()
    .isISO8601()
    .withMessage("Deleted At must be a valid date"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

/**
 * Validation for citizen login
 */
export const citizeLoginValidation: RequestHandler[] = [
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

/**
 * Validation for citizen email verification
 */
export const citizenEmailVerificationValidation: RequestHandler[] = [
  query("token")
    .notEmpty()
    .withMessage("Verification token is required")
    .isLength({ min: 1 })
    .withMessage("Token cannot be empty"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
