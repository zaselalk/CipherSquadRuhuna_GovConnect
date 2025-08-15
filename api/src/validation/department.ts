import { body, query, validationResult } from "express-validator";
import { Request, RequestHandler, Response, NextFunction } from "express";

/**
 * Validation for creating a new department
 */
export const departmentCreateValidation: RequestHandler[] = [
  body("name").notEmpty().withMessage("Department name is required"),
  body("link")
    .optional()
    .isURL()
    .withMessage("Link must be a valid URL"),
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
 * Validation for updating a department
 */
export const departmentUpdateValidation: RequestHandler[] = [
  body("name").optional().notEmpty().withMessage("Department name cannot be empty"),
  body("link")
    .optional()
    .isURL()
    .withMessage("Link must be a valid URL"),
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
 * Validation for GET requests (query parameters)
 */
export const departmentGetValidation: RequestHandler[] = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
  query("name")
    .optional()
    .isString()
    .withMessage("Name filter must be a string"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
