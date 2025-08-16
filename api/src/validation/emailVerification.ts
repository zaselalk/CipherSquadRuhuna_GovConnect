import { body, query } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      status: 400,
      error: errors.array(),
      data: null,
    });
  }
  next();
};

/**
 * Validation for email verification
 */
export const emailVerificationValidation = [
  body("token")
    .notEmpty()
    .withMessage("Verification token is required")
    .isLength({ min: 1 })
    .withMessage("Token cannot be empty"),
  handleValidationErrors,
];

/**
 * Validation for resending verification email
 */
export const resendVerificationValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  handleValidationErrors,
];

/**
 * Validation for email verification via query parameter (for GET requests)
 */
export const emailVerificationQueryValidation = [
  query("token")
    .notEmpty()
    .withMessage("Verification token is required")
    .isLength({ min: 1 })
    .withMessage("Token cannot be empty"),
  handleValidationErrors,
];
