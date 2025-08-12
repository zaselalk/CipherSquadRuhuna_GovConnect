import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult } from "express-validator";

export const valiadteResident: RequestHandler[] = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("nic")
        .matches(/^\d{9}[VX]$|^\d{12}$/).withMessage("NIC must be 9 digits followed by 'V' or 'X' OR a 12-digit number"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("birthday").isDate().withMessage("Birthday is not valid"),
    body("bloodGroup")
        .matches(/^(A|B|AB|O)[+-]$/).withMessage("Blood group must be A+, A-, B+, B-, AB+, AB-, O+, or O-")
        .notEmpty().withMessage("Blood group is required"),
    body("gender").notEmpty().withMessage("gender is required"),
    // body("bloodPressure").isNumeric().withMessage("Blood pressure must be numeric"),
    // body("heartRate").isNumeric().withMessage("Heart rate must be numeric"),
    body("contactNumber")
        .isLength({ min: 10, max: 10 }).withMessage("Contact number must be 10 digits")
        .matches(/^\d+$/).withMessage("Contact number must be numeric")
        .notEmpty().withMessage("Contact number is required"),

    // body("divisionId").isNumeric().withMessage("Division ID must be numeric"),
    body("maritalState").isAlpha().withMessage("Marital state must be alphabetic"),
    // body("educationLevel").isAlpha().withMessage("Education level must be alphabetic"),
    body("height").isNumeric().withMessage("Height must be numeric"),
    body("weight").isNumeric().withMessage("Weight must be numeric"),


    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },


];