import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role, User } from "../models";
import { UserAttributes } from "../models/user";

// jwt payload
interface JwtPayload {
  id: number;
}

interface UserInfo extends UserAttributes {
  role?: {
    id: number;
    role: string;
    permission: string;
  };
}

declare global {
  namespace Express {
    interface User extends UserInfo {}
  }
}

export default async function serializeUser(
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
    const secretKey = process.env.JWT_SECRET_ADMIN as string;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    const findUser = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "role", "permission"],
        },
      ],
    });

    if (!findUser) return next();

    const decordedUse = findUser.toJSON();
    req.user = decordedUse;

    next();
  } catch (error) {
    req.user = undefined;
    console.log(error);
    next();
    return;
  }
}
