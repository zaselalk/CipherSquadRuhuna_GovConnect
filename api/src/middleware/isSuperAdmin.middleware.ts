import { Request, Response, NextFunction } from "express";

/**
 * Middleware to protect routes for super admin users only.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns
 */
export const isSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if user is logged in
  if (!req.user) {
    res.status(401).json({
      message: "Unauthorized",
      status: 401,
    });
    return;
  }

  let user = req.user;

  // Ensure user has a role and that the role is defined
  if (!user.role || !user.role.role) {
    res.status(403).json({
      message: "Forbidden - Invalid user ",
      status: 403,
    });
    return;
  }

  // Check if the user's role is 'super_admin'
  if (user?.role.role !== "super_admin") {
    res.status(403).json({
      message: "Forbidden - Insufficient permissions",
      status: 403,
    });
    return;
  }

  next();
};
