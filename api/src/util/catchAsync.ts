import { NextFunction, Request, Response } from "express";
import { UserNotFoundException } from "../exceptions/UserNotFound";
import { ValidationException } from "../exceptions/ValidatationError";

const catchAsync = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error) => {
      console.log(error);
      if (
        error instanceof ValidationException ||
        error instanceof UserNotFoundException
      ) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    });
  };
};

export default catchAsync;
