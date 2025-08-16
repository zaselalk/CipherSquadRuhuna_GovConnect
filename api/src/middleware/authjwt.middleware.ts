import { Request, Response, NextFunction } from "express";
export const protectRoute =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    // check if user is logged in
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized",
        status: 401,
      });
      return;
    }
    console.log(req.user.role);

    // check if user has role
    if (!req.user.role) {
      res.status(403).json({
        message: "Forbidden",
        status: 403,
      });
      return;
    }

    // check if the user is allowed to access the route
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: "Forbidden",
        status: 403,
      });
      return;
    }

    next();
  };
