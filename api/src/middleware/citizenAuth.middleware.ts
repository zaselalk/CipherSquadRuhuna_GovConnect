import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Citizen } from "../models/citizen";

// jwt payload
interface JwtPayload {
  id: number;
}

declare global {
  namespace Express {
    interface Request {
      citizen?: Citizen;
    }
  }
}

export default async function serializeCitizen(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // get token from header
  let token = req.headers.authorization?.split(" ")[1] || null;

  // Normalize token to null if it's "null" or "undefined" as a string
  if (token === "null" || token === "undefined") {
    token = null;
  }

  if (!token) return next();

  // decode jwt token
  try {
    const secretKey = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    const findCitizen = await Citizen.findByPk(decoded.id);

    if (!findCitizen) return next();

    req.citizen = findCitizen;

    next();
  } catch (error) {
    req.citizen = undefined;
    console.log("Citizen token verification error:", error);
    next();
    return;
  }
}

export const requireCitizenAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.citizen) {
    res.status(401).json({
      message: "Unauthorized - Citizen authentication required",
      status: 401,
      error: null,
      data: null,
    });
    return;
  }
  next();
};
